import { getRepository } from "typeorm";
import { Member } from "../entity/member";
const { retrieveOne } = require("../utilities/dbConnection");

export const Members = async function (req, res, next) {
  try {
    const memberRepository = getRepository(Member);
    const members = await memberRepository.find({
      relations: ["user", "relationship"],
      where: {
        user: {
          id: req.user.id,
        },
      },
    });
    return res.status(200).json({ members, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

export const MemberById = async function (req, res, next) {
  try {
    const { id } = req.params;
    const memberRepository = getRepository(Member);
    const member = await memberRepository.findOne({
      where: {
        id,
      },
      relations: ["user", "relationship"],
    });
    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: "Member not found",
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
};

export const MemberPhoto = async (req, res) => {
  const { bucket, result } = await retrieveOne("Members", {
    prop: req.params.filename,
  });
  res.set("Content-Type", result.contentType);
  let file = bucket.openDownloadStreamByName(req.params.filename);
  file.on("error", function (err) {
    return res.status(500).json({
      status: "failed",
      message: "Unable to render the file data",
    });
  });
  return file.pipe(res);
};

export const CreateMember = async function (req, res, next) {
  try {
    const memberRepository = getRepository(Member);
    let member = await memberRepository.create({
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
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

export const UpdateMember = async function (req, res, next) {
  try {
    const memberRepository = getRepository(Member);
    const member = await memberRepository.findOne({
      id: req.params.id,
    });
    const updatedMember = {
      firstname: req.body.firstname ? req.body.firstname : member.firstname,
      lastname: req.body.lastname ? req.body.lastname : member.lastname,
      dob: req.body.dob ? req.body.dob : member.dob,
      gender: req.body.gender ? req.body.gender : member.gender,
      email: req.body.email ? req.body.email : member.email,
      phone: req.body.phone ? req.body.phone : member.phone,
      updatedAt: new Date().toISOString(),
      imageurl: req.file ? req.file.filename : member.imageurl,
      relationship: req.body.relationship
        ? req.body.relationship
        : member.relationship,
    };
    let result = await memberRepository.update(
      { id: req.params.id },
      updatedMember
    );

    if (result) {
      const member = await memberRepository.find({
        where: {
          id: req.params.id,
        },
        relations: ["relationship"],
      });
      return res.status(201).json({
        member,
        status: "success",
        message: "Member updated Successfully",
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
};

export const deleteMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const memberRepository = getRepository(Member);
    const member = await memberRepository.delete({
      id,
    });
    if (!member) {
      return res.status(422).json({
        status: "failed",
        message: "Unable to delete the member",
      });
    }
    return res
      .status(204)
      .json({ member, status: "success", message: "deleted member" });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};
