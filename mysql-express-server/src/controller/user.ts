import { getRepository } from "typeorm";
import { User } from "../entity/user";
const { retrieveOne } = require("../utilities/dbConnection");
const bcrypt = require("bcryptjs");

export const Users = async (req, res, next) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    if (!users) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    return res.status(200).json({ users, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

export const UserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRepository = getRepository(User);
    const user = await userRepository.find({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    return res.status(200).json({ user, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

export const UserPhoto = async (req, res) => {
  try {
    const { bucket, result } = await retrieveOne("Users", {
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
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

export const UpdateUser = async function (req, res, next) {
  try {
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({
      where: {
        id: req.user.id,
      },
    });
    const salt = req.body.password ? await bcrypt.genSalt(10) : user.salt;
    const password = req.body.password
      ? await bcrypt.hash(req.body.password, salt)
      : user.password;
    const updatedUser = {
      firstname: req.body.firstname ? req.body.firstname : user.firstname,
      lastname: req.body.lastname ? req.body.lastname : user.lastname,
      username: req.body.username ? req.body.username : user.username,
      dob: req.body.dob ? req.body.dob : user.dob,
      gender: req.body.gender ? req.body.gender : user.gender,
      phone: req.body.phone ? req.body.phone : user.phone,
      password,
      salt,
      updatedAt: new Date().toISOString(),
      photourl: req.file ? req.file.filename : user.photourl,
    };
    let result = await userRepository.update(
      {
        id: req.user.id,
      },
      updatedUser
    );
    let userR = await userRepository.findOne({
      id: req.user.id,
    });
    console.log(result);
    if (!result) {
      return res.status(422).json({
        status: "failed",
        message: "Unable to update the user",
      });
    }
    return res.status(201).json({
      user: userR,
      status: "success",
      message: `Updated ${req.user.id} successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

export const deleteUserBySession = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userRepository = getRepository(User);
    const user = await userRepository.delete({
      id,
    });
    if (!user) {
      return res.status(422).json({
        status: "failed",
        message: "Unable to delete the user",
      });
    }
    return res.status(204).json({ user, status: "deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};
