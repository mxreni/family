import { getRepository } from "typeorm";
import { User } from "../entity/user";

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../middleware/auth");

// Local Strategy Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    return res.status(200).json({
      user: req.user,
      status: "success",
      message: "logged in",
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.json({
    user: req.user,
    status: "success",
    message: "User has been logged out",
  });
});

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const userRepository = getRepository(User);
    let user = await userRepository.create({
      ...req.body,
      password,
      salt,
    });
    user = await userRepository.save(user);
    if (user) {
      return res.status(200).json({
        ...user,
        status: "success",
        message: "account created successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

// Get the user
router.get("/", isAuthenticated, async function (req, res) {
  try {
    if (req.user) {
      const userRepository = getRepository(User);
      const user = await userRepository.find({
        where: {
          id: req.user.id,
        },
      });
      return res.status(200).json(user[0]);
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

module.exports = router;
