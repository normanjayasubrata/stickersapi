console.log("norman", process.env.NODE_ENV)
const environtment = process.env.NODE_ENV || "development";
console.log("environtment", environtment)

const config = require("../knexfile");
console.log("config", config)

const knex = require("knex")(config[environtment]);
console.log("knex", knex)

module.exports = knex

