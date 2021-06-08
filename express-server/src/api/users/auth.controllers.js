const bcrypt = require("bcrypt");

const User = require("./users.model");
const { Tree: Trees } = require("../trees/trees.model");

const genuuid = require("uuid").v4;

exports.Login = async (req, res) => {
  if (req.user) {
    console.log(req.user.firstname, req.user.lastname);
    let name = req.user.firstname + " " + req.user.lastname;
    let found = await Trees.query().where("name", name);

    if (!found.length) {
      await Trees.query().insert({
        id: genuuid(),
        status: "active",
        name: req.user.firstname + " " + req.user.lastname,
        parent: req.body.parent,
        depth: 1,
        user: req.user.id,
        relationship: "me",
      });
    }
    return res.status(200).json({
      user: req.user,
      status: "success",
      message: "logged in",
    });
  }
};

exports.Logout = (req, res) => {
  req.logout();
  req.session.destroy();
  return res.json({
    user: req.user,
    status: "success",
    message: "User has been logged out",
  });
};

exports.Signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    let user = await User.query().insertAndFetch({
      ...req.body,
      password,
      salt,
    });

    console.log(user);
    if (user) {
      return res.status(200).json({
        ...user,
        status: "success",
        message: "account created successfully",
      });
    } else {
      return res.status(422).json({
        status: "failed",
        message: "Something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user) {
      const user = await User.query().where("id", req.user.id).first();
      return res.status(200).json({
        ...user,
        status: "success",
        message: "successfully fetched current user",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};
