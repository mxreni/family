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
// route require

const AuthRoute = require("./routes/auth");
const SocialAuthRoute = require("./routes/socialAuth");
const MembersRoute = require("./routes/member");
const RelationshipRoute = require("./routes/relationship");
const usersRoute = require("./routes/user");
// route middleware
const isAuthenticated = require("./middleware/auth");
const sessionOptions = require("./utilities/sessionOptions");
// entity require
import { Session } from "./entity/session";

createConnection(connectionOptions)
  .then(async (connection) => {
    // db repository

    const sessionRepository = getRepository(Session);

    //   app initialization
    const app = express();
    app.use(
      cors({
        origin: process.env.clientURI,
        credentials: true,
      })
    );
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(helmet());

    //session setup

    app.use(session(sessionOptions(sessionRepository)));

    //  passport setup

    app.use(passport.initialize());
    app.use(passport.session());
    localAuthStrategy();
    facebookAuthStrategy();
    googleAuthStrategy();
    twitterAuthStrategy();

    // app level routes
    app.use("/", AuthRoute);
    app.use("/auth", SocialAuthRoute);
    app.use("/members", isAuthenticated, MembersRoute);
    app.use("/relationship", isAuthenticated, RelationshipRoute);
    app.use("/users", isAuthenticated, usersRoute);

    // server listening
    app.listen(Number(process.env.PORT), function () {
      console.log("listening on the port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
