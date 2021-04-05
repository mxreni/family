import { getRepository } from "typeorm";
import { Relationship } from "../entity/relationship";

export const Relationships = async (req, res) => {
  try {
    const relationshipRepository = getRepository(Relationship);
    const relationships = await relationshipRepository.find();
    console.log(relationships);
    return res.status(200).json({
      relationships,
      status: "success",
      message: "Success retrieving relationships",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

export const CreateRelationship = async (req, res) => {
  try {
    const relationshipRepository = getRepository(Relationship);
    let relationship = await relationshipRepository.create({
      name: req.body.name,
    });
    relationship = await relationshipRepository.save(relationship);
    return res.status(200).json({
      relationship,
      status: "success",
      message: `Success creating relationship ${relationship.name}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

export const RelationshipById = async function (req, res, next) {
  try {
    const { id } = req.params;
    const relationshipRepository = getRepository(Relationship);
    const relationship = await relationshipRepository.findOne({
      where: {
        id,
      },
    });
    if (!relationship) {
      return res.status(404).json({
        status: "failed",
        message: "Relationship not found",
      });
    }
    return res.status(200).json({ relationship, status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};
