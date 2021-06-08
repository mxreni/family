require("dotenv").config();

const express = require("express");
const session = require("express-session");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");

const authRoute = require("./api/users/auth.routes");
const userRoute = require("./api/users/users.routes");
const treeRoute = require("./api/trees/trees.routes");
const eventRoute = require("./api/events/events.routes");
const helmet = require("helmet");

const db = require("./utils/db");
const { sessionOptions } = require("./utils/session");

const localAuthStrategy = require("./passport/localAuth");
const facebookAuthStrategy = require("./passport/facebookAuth");
const googleAuthStrategy = require("./passport/googleAuth");
const twitterAuthStrategy = require("./passport/twitterAuth");
const { isAuthenticated } = require("./middleware/auth");

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

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
localAuthStrategy();
// facebookAuthStrategy();
// googleAuthStrategy();
// twitterAuthStrategy();

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/tree", isAuthenticated, treeRoute);
app.use("/event", eventRoute);

app.listen(3000, () => {
  console.log("listening on the port 3000");
});
