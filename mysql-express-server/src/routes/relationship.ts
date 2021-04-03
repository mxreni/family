import { CreateRelationship, Relationships } from "../controller/relationship";

const express = require("express");
const router = express.Router();

router.get("/", Relationships);

router.post("/", CreateRelationship);

module.exports = router;
