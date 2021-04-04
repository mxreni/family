import { UpdateUser, UserById, UserPhoto, Users } from "../controller/user";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../utilities/mediaStorage");

const upload = multer({
  storage: storage("Users"),
});

router.get("/", Users);

router.get("/:id", UserById);

router.get("/:id/:filename", UserPhoto);

router.put("/", upload.single("file"), UpdateUser);

module.exports = router;
