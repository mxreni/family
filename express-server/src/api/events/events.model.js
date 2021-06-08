const { Model } = require("objection");

class Event extends Model {
  static get tableName() {
    return "events";
  }

  static relationMappings() {
    const Tree = require("../trees/trees.model");

    return {
      member: {
        modelClass: Tree,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "events.person",
          to: "trees.id",
        },
      },
    };
  }
}

module.exports = Event;
