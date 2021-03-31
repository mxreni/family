import { getRepository } from "typeorm";
import { Member } from "../entity/member";

const express = require("express");
const router = express.Router();
const multipart = require("connect-multiparty");

// get members
router.get("/members", async function (req, res, next) {
  try {
    const memberRepository = getRepository(Member);
    const members = await memberRepository.find();
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
router.get("/members/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const memberRepository = getRepository(Member);
    const member = await memberRepository.find({
      where: {
        id,
      },
    });
    return res.status(200).json({ member, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

// create member
router.post("/members", multipart(), async function (req, res, next) {
  try {
    // create member
    const memberRepository = getRepository(Member);
    const member = await memberRepository.create(req.body);
    await memberRepository.save(member);
    return res.status(201).json({ member, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

module.exports = router;
