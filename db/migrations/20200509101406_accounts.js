exports.up = function (knex) {
  return knex.schema.createTable("account", (table) => {
    table.increments("id");
    table.string("username", 64);
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamp("date_created");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
