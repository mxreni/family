require("dotenv").config();
const Knex = require("knex");
const session = require("express-session");
const knexStore = require("connect-session-knex")(session);

const knex = Knex({
  client: "mysql2",
  connection: {
    host: process.env.SERVER_HOST,
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASS,
    database: process.env.SERVER_DATABASE,
  },
});

const store = new knexStore({
  knex,
});

exports.sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
};
