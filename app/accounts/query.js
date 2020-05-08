const pool = require("../../db/databasePool");

class AccountQuery {

    static readAll() {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM account")
            .then(response => resolve(response.rows))
            .catch(error => reject(error))
        })
    }

    static readByEmail(email) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM account WHERE email = $1", [email])
            .then(response => {
                resolve(response.rows[0])
            })
            .catch(error => reject(error))
        })
    }

    static readById(id) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM account WHERE id = $1", [id])
            .then(response => {
                resolve(response.rows[0])
            })
            .catch(error => reject(error))
        })
    }

    static create(account) {
        const {username, email, password} = account
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO account (username, email, password, date_created)
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [username, email, password, new Date()]
            )
            .then(response => resolve(response.rows[0]))
            .catch(error => reject(error))
        })
    }
}


module.exports = AccountQuery;