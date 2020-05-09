exports.up = function (knex) {
  return knex.schema.createTable("logo", (table) => {
    table.increments("id");
    table.string("title", 64).notNullable();
    table.string("description").notNullable();
    table.integer("rating");
    table.string("url").notNullable();
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable("logo")
};
