// 775842228033-v76svj4ibthupe224uv32lo62q49ifi9.apps.googleusercontent.com

// use env variables
require("dotenv").config();

// express server app
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// passport auth require
const passport = require("passport");
const localAuthStrategy = require("./passport/localAuth");
const facebookAuthStrategy = require("./passport/facebookAuth");
const googleAuthStrategy = require("./passport/googleAuth");
const twitterAuthStrategy = require("./passport/twitterAuth");

// db connect require
const { createConnection } = require("typeorm");
const connectionOptions = require("./ormconfig");
require("reflect-metadata");
import { getRepository } from "typeorm";
import { TypeormStore } from "connect-typeorm";

// route require

const AuthRoute = require("./routes/auth");
const SocialAuthRoute = require("./routes/socialAuth");
const MembersRoute = require("./routes/member");

// route middleware
const isAuthenticated = require("./middleware/auth");

// entity require
import { Session } from "./entity/session";

createConnection(connectionOptions)
  .then(async (connection) => {
    // db repository

    const sessionRepository = getRepository(Session);

    //   app initialization
    const app = express();
    const allowed = ["http://localhost:8080", "https://www.facebook.com"];
    const corsOptions = {
      origin: allowed,
      credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(helmet());

    //session setup

    app.use(
      session({
        secret: "family-forever",
        resave: false,
        store: new TypeormStore({
          ttl: 864000,
        }).connect(sessionRepository),
        saveUninitialized: false,
        cookie: {
          path: "/",
          httpOnly: true,
          sameSite: "none",
          secure: false,
          maxAge: 1000 * 60 * 60 * 24,
        },
      })
    );

    //  passport setup

    app.use(passport.initialize());
    app.use(passport.session());
    localAuthStrategy();
    facebookAuthStrategy();
    googleAuthStrategy();
    twitterAuthStrategy();

    app.use("/", AuthRoute);
    app.use("/auth", SocialAuthRoute);
    app.use("/members", isAuthenticated, MembersRoute);

    app.listen(3000, function () {
      console.log("listening on the port", 3000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
