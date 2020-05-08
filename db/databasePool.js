const {Pool} = require("pg");
const config = process.env.DATABASE_URL || require("../secrets/config");

const pool = new Pool({
   ...config,
    password: ""
})

module.exports = pool;