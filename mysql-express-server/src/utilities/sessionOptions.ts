import { TypeormStore } from "connect-typeorm";

const sessionOptions = (sessionRepository) => ({
  secret: process.env.SESSION_SECRET,
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
});

module.exports = sessionOptions;
