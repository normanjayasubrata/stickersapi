const environtment = process.env.NODE_ENV || "development";
const config = require("../knexfile");
const environtmentConfig = config[environtmentConfig]

module.exports = require("knex")(environtmentConfig);

