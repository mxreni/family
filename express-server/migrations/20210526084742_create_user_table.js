/**
 * @param {import('knex')} knex
 */

const genuuid = require("uuid").v4;

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").notNullable().primary();
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("username").defaultTo(genuuid()).notNullable();
    table.string("phone", 20);
    table.string("DOB");
    table.enu("gender", ["male", "female", "other"]).defaultTo("female");
    table.string("email");
    table.string("password");
    table.string("salt");
    table.string("facebookID");
    table.string("googleID");
    table.string("twitterID");
    table.string("photourl");
    table.string("status").defaultTo("active").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.unique(["id", "email", "phone"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
