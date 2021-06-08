const User = require("./users.model");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.query().where("id", req.user.id);
    const salt = req.body.password ? await bcrypt.genSalt(10) : user.salt;
    const password = req.body.password
      ? await bcrypt.hash(req.body.password, salt)
      : user.password;
    const updatedUser = {
      firstname: req.body.firstname ? req.body.firstname : user.firstname,
      lastname: req.body.lastname ? req.body.lastname : user.lastname,
      username: req.body.username ? req.body.username : user.username,
      DOB: req.body.dob ? req.body.dob : user.DOB,
      gender: req.body.gender ? req.body.gender : user.gender,
      phone: req.body.phone ? req.body.phone : user.phone,
      password,
      salt,
      updatedAt: new Date().toISOString(),
      photourl: req.file ? req.file.path : user.photourl,
    };
    let result = await User.query().patchAndFetchById(
      {
        id: req.user.id,
      },
      updatedUser
    );
    console.log(result);
    if (!result) {
      return res.status(422).json({
        status: "failed",
        message: "Unable to update the user",
      });
    }
    return res.status(201).json({
      user: result,
      status: "success",
      message: `Updated ${req.user.id} successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

// get user
exports.UserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.query().where({
      id,
    });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    return res.status(200).json({ user, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};
