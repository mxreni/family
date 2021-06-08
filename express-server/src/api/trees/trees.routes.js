const express = require("express");
const {
  getTree,
  createTree,
  getTreeById,
  updateTree,
} = require("./trees.controllers");

const multer = require("multer");
// const storage = require("../../utils/mediaStorage");

const storage = require("../../utils/cloudinaryStorage");

const router = express.Router();

const upload = multer({
  storage: storage("trees"),
});

router.get("/", getTree);

router.get("/:id", getTreeById);

router.post("/", upload.single("file"), createTree);

router.put("/:id", upload.single("file"), updateTree);

module.exports = router;
