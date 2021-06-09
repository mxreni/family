const genuuid = require("uuid").v4;
const data = require("../data/data.json");
const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  let id = genuuid();
  console.log(id);
  return knex("trees")
    .del()
    .then(function () {
      return knex("users").del();
    })
    .then(async function () {
      const salt = await bcrypt.genSalt(10);
      return knex("users").insert([
        {
          id,
          firstname: "Leslie",
          lastname: "Ashlin",
          username: genuuid(),
          phone: "232321323",
          dob: "12-12-1994",
          email: "leslieashlin@gmail.com",
          salt,
          password: await bcrypt.hash("test123123", salt),
        },
      ]);
    })
    .then(function () {
      return knex("trees").insert(
        data.map((a) => ({
          id: a.id,
          name: a.name,
          depth: a.depth,
          gender: a.gender,
          DOB: a.DOB,
          user: id,
        }))
      );
    })
    .then(function () {
      return data.reduce(async (a, b) => {
        await a;
        return updateTree(knex, b);
      }, Promise.resolve());
    });
};

const updateTree = (knex, data) => {
  return knex("trees")
    .where("id", "=", data.id)
    .first()
    .then((val) => {
      console.log(val);
      return knex("trees")
        .update({
          parent: data.parent,
          partner: data.partner,
        })
        .where("id", "=", val.id);
    });
};
