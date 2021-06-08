const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
} = require("./events.controllers");

// const storage = require("../../utils/mediaStorage");
const multer = require("multer");

const storage = require("../../utils/cloudinaryStorage");

const router = express.Router();

const upload = multer({
  storage: storage("events"),
});

router.route("/").get(getEvents).post(upload.single("image"), createEvent);

router.route("/:id").get(getEventById);

module.exports = router;
