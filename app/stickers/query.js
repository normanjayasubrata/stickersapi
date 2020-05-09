const knex = require("../../db/knex");

class StickerQuery {
  static read({ id } = {}) {
    if (id) {
      return knex.select().table("logo").where("id", id);
    } else {
      return knex.select().table("logo").orderBy("id", "asc");
    }
  }

  static create(sticker) {
    return knex("logo").returning("*").insert(sticker);
  }

  static update(id, sticker) {
    return knex("logo").returning("*").where("id", "=", id).update(sticker);
  }

  static delete(id) {
    return knex("logo").where("id", id).del();
  }
}

module.exports = StickerQuery;
