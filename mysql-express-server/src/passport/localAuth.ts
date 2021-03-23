import { getRepository } from "typeorm";
import { User } from "../entity/user";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

import * as bcrypt from "bcryptjs";

const localAuthStrategy = async () => {
  try {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async function (email, password, cb) {
          const userRepository = getRepository(User);

          const user: User = await userRepository.findOne({
            where: {
              email,
            },
          });
          if (user) {
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
      return cb(null, user.id);
    });

    passport.deserializeUser(async function (id, cb) {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: {
          id,
        },
      });
      return cb(null, user);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = localAuthStrategy;
