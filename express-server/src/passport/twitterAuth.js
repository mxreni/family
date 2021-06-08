const TwitterStrategy = require("passport-twitter");
const passportObj = require("passport");

const twitterAuthStrategy = () => {
  const createUser = require("../utils/createUser");

  passportObj.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_CLIENT_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL,
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

module.exports = twitterAuthStrategy;
