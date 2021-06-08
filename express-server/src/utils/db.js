// require knex
require("dotenv").config();
const knex = require("knex");

// require Model from objection
const { Model } = require("objection");

// require config
const config = require("../../knexfile").development;

// create knex instance with the default config
const connection = knex(config);

//pass the knex instance to the model
Model.knex(connection);

module.exports = connection;
