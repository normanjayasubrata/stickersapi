const LOGOS = require("../data/logos");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('logo').del()
    .then(function () {
      // Inserts seed entries
      return knex('logo').insert(LOGOS);
    });
};
