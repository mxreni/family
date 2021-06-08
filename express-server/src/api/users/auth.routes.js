const express = require("express");

const router = express.Router();

const multer = require("multer");
// const storage = require("../../utils/mediaStorage");

const storage = require("../../utils/cloudinaryStorage");

const passport = require("passport");

const { Login, Logout, Signup, getUser } = require("./auth.controllers");
const { isAuthenticated } = require("../../middleware/auth");

router.post("/login", passport.authenticate("local"), Login);

router.get("/logout", Logout);

router.post("/", Signup);

router.get("/", isAuthenticated, getUser);

module.exports = router;
