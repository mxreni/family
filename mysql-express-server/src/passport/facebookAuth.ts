const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

// repo
const facebookAuthStrategy = () => {
  const createUser = require("../utilities/createUser");

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const user = await createUser(profile);
          return cb(null, user);
        } catch (err) {
          return;
        }
      }
    )
  );
};

module.exports = facebookAuthStrategy;
