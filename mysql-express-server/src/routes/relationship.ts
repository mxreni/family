import {
  CreateRelationship,
  RelationshipById,
  Relationships,
} from "../controller/relationship";

const express = require("express");
const router = express.Router();

router.get("/", Relationships);

router.post("/", CreateRelationship);

router.get("/:id", RelationshipById);

module.exports = router;
