import { getUser, Login, Logout, Signup } from "../controller/auth";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../middleware/auth");

router.post("/login", passport.authenticate("local"), Login);

router.get("/logout", Logout);

router.post("/", Signup);

router.get("/", isAuthenticated, getUser);

module.exports = router;
