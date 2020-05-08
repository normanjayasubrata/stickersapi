const pool = require("../databasePool");
const logos = require("../../data/logos");

pool.query("TRUNCATE TABLE logo")
.then(() => {
    pool.query("ALTER SEQUENCE logo_id_seq RESTART WITH 1")
    .then(() => {
        logos.forEach(logo => {
            const {title, description, rating, url} = logo;
            pool.query(
                `INSERT INTO logo (title, description, rating, url)
                VALUES ($1, $2, $3, $4) RETURNING id, title`,
                [title, description, rating, url],
            ) 
            .then(response => {
                const {id, title} = response.rows[0]
                console.log(`Data of ID ${id} with title ${title} inserted`)
            })   
            .catch(error => console.error(error))
        });
    })
    .catch(error => console.error(error))
})
.catch(error => console.error(error))

