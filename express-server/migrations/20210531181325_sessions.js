exports.up = function (knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.string("sid").notNullable();
    table.json("sess").notNullable();
    table.timestamp("expired").notNullable();
    table.index("expired");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sessions");
};
