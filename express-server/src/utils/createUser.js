const User = require("../api/users/users.model");

exports.createUser = async (profile) => {
  const userFound = await User.query()
    .where(`${profile.provider}ID`, profile.id)
    .first();
  if (userFound) {
    return userFound;
  } else {
    let userData;
    switch (profile.provider) {
      case "facebook":
        userData = {
          facebookID: profile.id,
          firstname: profile._json.first_name,
          lastname: profile._json.last_name,
        };
      case "google":
        userData = {
          googleID: profile.id,
          firstname: profile._json.given_name,
          lastname: profile._json.family_name,
          email: profile._json.email,
          photourl: profile._json.picture,
        };
      case "twitter":
        userData = {
          twitterID: profile.id,
          firstname: profile._json.name.split(" ")[0],
          lastname: profile._json.name.split(" ")[1],
          photourl: profile._json.profile_image_url,
        };
    }
    let user = await User.query().insertAndFetch({
      ...userData,
    });
    return user;
  }
};
