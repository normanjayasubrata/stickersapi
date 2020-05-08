const pool = require("../databasePool");
const accounts = require("../../data/accounts");

pool.query("TRUNCATE TABLE account")
.then(() => {
    pool.query("ALTER SEQUENCE account_id_seq RESTART WITH 1")
    .then(() => {
        accounts.forEach(account => {
            const {username, email, password} = account;
            pool.query(
                `INSERT INTO account (username, email, password, date_created)
                VALUES ($1, $2, $3, $4) RETURNING id, email`,
                [username, email, password, new Date()],
            ) 
            .then(response => {
                const {id, email} = response.rows[0]
                console.log(`Data of ID ${id} with email ${email} inserted`)
            })   
            .catch(error => console.error(error))
        });
    })
    .catch(error => console.error(error))
})
.catch(error => console.error(error))