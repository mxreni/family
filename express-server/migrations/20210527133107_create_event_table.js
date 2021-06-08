exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id").notNullable().primary();
    table.string("person").references("id").inTable("trees");
    table.string("type").notNullable();
    table.string("name");
    table.text("description", "longtext");
    table.string("eventImageUrl");
    table.string("from_date");
    table.string("to_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("user").notNullable().references("id").inTable("users");
    table.string("status").defaultTo("active").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
