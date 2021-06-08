exports.up = function (knex) {
  return knex.schema.createTable("trees", (table) => {
    table.string("id").notNullable().primary();
    table.string("name").notNullable();
    table.string("DOB");
    table.enu("gender", ["male", "female", "other"]).defaultTo("female");
    table.integer("depth");
    table.string("relationship");
    table.string("photourl");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("user").notNullable().references("id").inTable("users");
    table.string("parent").references("id").inTable("trees");
    table.string("partner").references("id").inTable("trees");
    table.string("status").defaultTo("active").notNullable;
    table.unique(["id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("trees");
};
