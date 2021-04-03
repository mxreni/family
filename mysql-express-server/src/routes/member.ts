const storage = require("../utilities/mediaStorage");
import {
  CreateMember,
  MemberById,
  MemberPhoto,
  Members,
  UpdateMember,
} from "../controller/member";

const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: storage("Members"),
});

router.get("/", Members);

router.get("/:id", MemberById);

router.get("/:id/:filename", MemberPhoto);

router.post("/", upload.single("file"), CreateMember);

router.put("/:id", upload.single("file"), UpdateMember);

module.exports = router;
