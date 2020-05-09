const knex = require("../../db/knex");

class AccountQuery {
  static readAll() {
    return knex.select().table("account");
  }

  static readByEmail(email) {
    return knex.select().table("account").where("email", email);
  }

  static readById(id) {
    return knex.select().table("account").where("id", id);
  }

  static create(account) {
    return knex("account").returning("*").insert(account);
  }
}

module.exports = AccountQuery;
