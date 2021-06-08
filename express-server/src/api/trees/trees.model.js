const { Model } = require("objection");

const columns = [
  "id",
  "name",
  "DOB",
  "gender",
  "depth",
  "photourl",
  "relationship",
  "created_at",
  "updated_at",
  "user",
  "status",
];

class Tree extends Model {
  static get tableName() {
    return "trees";
  }

  static relationMappings() {
    const User = require("../users/users.model");

    return {
      created_user: {
        modelClass: User,
        relation: Model.HasOneRelation,
        join: {
          from: "trees.user",
          to: "users.id",
        },
      },
      parents: {
        modelClass: Tree,
        relation: Model.HasOneRelation,
        filter: (query) => query.select(...columns),
        join: {
          from: "trees.parent",
          to: "trees.id",
        },
      },
      partners: {
        modelClass: Tree,
        relation: Model.BelongsToOneRelation,
        filter: (query) => query.select(...columns),
        join: {
          from: "trees.partner",
          to: "trees.id",
        },
      },
    };
  }
}

module.exports = {
  Tree,
  columns,
};
