console.log("norman", process.env.NODE_ENV)
const environtment = process.env.NODE_ENV || "development";
const config = require("../knexfile");

module.exports = require("knex")(config[environtment]);

