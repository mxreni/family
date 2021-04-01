import { getRepository } from "typeorm";
import { Member } from "../entity/member";

const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../utilities/mediaStorage");
const { MongoClient, GridFSBucket, ObjectID } = require("mongodb");

let bucket, files, db;

MongoClient.connect("mongodb://localhost:27017/myfamily", function (err, con) {
  db = con.db("myfamily");
  bucket = new GridFSBucket(db, {
    bucketName: "Members",
  });
  files = "Members.files";
});

const upload = multer({
  storage: storage("Members"),
});

router.get("/", async function (req, res, next) {
  try {
    const memberRepository = getRepository(Member);
    const members = await memberRepository.find({
      relations: ["user", "relationship"],
    });
    return res.status(200).json({ members, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

// get particular member id
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const memberRepository = getRepository(Member);
    const member = await memberRepository.find({
      where: {
        id,
      },
    });
    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: "Not found",
      });
    }
    return res.status(200).json({ member, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

// get member photo

router.get("/:id/:filename", async (req, res) => {
  let image = bucket.openDownloadStreamByName(req.params.filename);
  db.collection(files)
    .find({
      filename: req.params.filename,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  image.on("error", function (err) {
    console.log(err);
  });
  image.on("data", function (data) {
    console.log(data);
  });
  image.on("end", () => {
    console.log("end");
  });
  // res.set("Content-Type", filesQuery.contentType);
  return image.pipe(res);
});

// create member
router.post("/", upload.single("file"), async function (req, res, next) {
  try {
    const memberRepository = getRepository(Member);
    const member = await memberRepository.create({
      ...req.body,
      imageurl: req.file.filename,
      user: req.user.id,
    });
    await memberRepository.save(member);
    if (member) {
      return res.status(201).json({
        member,
        status: "success",
        message: "Member created Successfully",
      });
    } else {
      return res.status(422).json({
        status: "failed",
        message: "Unable to process the request",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

module.exports = router;
