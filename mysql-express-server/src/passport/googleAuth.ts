const GoogleStrategy = require("passport-google-oauth20");
const passportInstance = require("passport");

const googleAuthStrategy = () => {
  const createUser = require("../utilities/createUser");

  passportInstance.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
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

module.exports = googleAuthStrategy;
