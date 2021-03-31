const express = require("express");
const router = express.Router();
const passportI = require("passport");

router.get(
  "/facebook",
  passportI.authenticate("facebook", {
    successRedirect: "auth/facebook/callback",
  })
);

router.get(
  "/facebook/callback",
  passportI.authenticate("facebook"),
  function (req, res) {
    if (req.user) {
      return res.redirect(process.env.clientURI);
    }
  }
);

router.get(
  "/google",
  passportI.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passportI.authenticate("google"),
  function (req, res) {
    if (req.user) {
      return res.redirect(process.env.clientURI);
    }
  }
);

router.get("/twitter", passportI.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passportI.authenticate("twitter"),
  function (req, res) {
    if (req.user) {
      return res.redirect(process.env.clientURI);
    }
  }
);

module.exports = router;
