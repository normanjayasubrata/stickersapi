const pool = require("../../db/databasePool");

class StickerQuery {
    static read({id} = {}) {
        if (id) {
            return new Promise((resolve, reject) => {
                pool.query("SELECT * FROM logo WHERE id = $1", [id])
                .then(response => resolve(response.rows[0]))
                .catch(error => reject(error))
            })
        } else {
            return new Promise((resolve, reject) => {
                pool.query("SELECT * FROM logo ORDER BY id ASC").then(response => {
                    resolve(response.rows);
                })
                .catch(error => reject(error))
           })
        }
    }

    static create(sticker) {
        return new Promise((resolve, reject) => {
            const {title, description, rating, url} = sticker
            pool.query(
                `INSERT INTO logo (title, description, rating, url)
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [title, description, rating, url]
            )
            .then(response => resolve(response.rows[0]))
            .catch(error => reject(error))
        })
    }

    static update(id, sticker) {
        return new Promise((resolve, reject) => {
            const {title, description, rating, url} = sticker
            pool.query(
                `UPDATE logo 
                SET title = $1, description = $2, rating = $3, url = $4
                WHERE id = $5
                RETURNING *`,
                [title, description, rating, url, id]
            )
            .then(response => resolve(response.rows[0]))
            .catch(error => reject(error))
        })
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM logo WHERE id = $1", [id])
            .then(response => resolve(response.rowCount))
            .catch(error => reject(error))
        })
    }
}

module.exports = StickerQuery