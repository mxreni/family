const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../api/users/users.model");

const bcrypt = require("bcrypt");

const localAuthStrategy = async () => {
  try {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async function (email, password, cb) {
          let user = await User.query().where("email", email).first();
          if (user) {
            console.log(user);
            const passwordVerified = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordVerified) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          } else {
            return cb(null, false);
          }
        }
      )
    );

    passport.serializeUser(function (user, cb) {
      console.log(user);
      return cb(null, user.id);
    });

    passport.deserializeUser(async function (id, cb) {
      const user = await User.query().where("id", id).first();
      console.log(user);
      return cb(null, user);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = localAuthStrategy;
