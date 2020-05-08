const {Pool} = require("pg");
const config = require("../secrets/config");

const pool = new Pool({
    username: config.username,
    password: config.password,
    database: "logostore",
    host: config.host,
    port: config.port,
})

module.exports = pool;