import {
  UpdateUser,
  UserById,
  UserPhoto,
  Users,
  CurrentUser,
} from "../controller/user";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../utilities/mediaStorage");

const upload = multer({
  storage: storage("Users"),
});

router.get("/", Users);

router.get("/user/:id", UserById);

router.get("/current", CurrentUser);

router.get("/:id/:filename", UserPhoto);

router.put("/", upload.single("file"), UpdateUser);

module.exports = router;
