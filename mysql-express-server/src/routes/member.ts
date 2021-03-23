import { getRepository } from "typeorm";
import { Member } from "../entity/member";

const express = require("express");
const router = express.Router();

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

router.post("/members", async function (req, res, next) {
  try {
    // create member
    const memberRepository = getRepository(Member);
    const members = memberRepository.find();
    return res.status(200).json({ members, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
});

module.exports = router;
