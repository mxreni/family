const { isAuthenticated } = require("../../middleware/auth");
const { UserById, updateUser } = require("./users.controllers");

const storage = require("../../utils/cloudinaryStorage");

const multer = require("multer");
const upload = multer({
  storage: storage("users"),
});

const router = require("express").Router();

router.put("/:id", isAuthenticated, upload.single("image"), updateUser);

router.get("/:id", isAuthenticated, UserById);

module.exports = router;
