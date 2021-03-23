const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// passport auth require
const passport = require("passport");
const localAuthStrategy = require("./passport/localAuth");

// db connect require
const { createConnection } = require("typeorm");
const connectionOptions = require("./ormconfig");
require("reflect-metadata");
import { getRepository } from "typeorm";
import { TypeormStore } from "connect-typeorm";
// route require

const AuthRoute = require("./routes/auth");
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
    app.use(
      cors({
        origin: "http://localhost:8080",
        credentials: true,
      })
    );
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

    //  app routes

    app.use("/", AuthRoute);
    app.use("/members", isAuthenticated, MembersRoute);

    app.listen(3000, function () {
      console.log("listening on the port", 3000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
