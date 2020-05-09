const environtment = process.env.NODE_ENV || "development";
const config = require("../knexfile");
const environtmentConfig = config[environtment]

module.exports = require("knex")(environtmentConfig);

