// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.SERVER_HOST,
      user: process.env.SERVER_USER,
      password: process.env.SERVER_PASS,
      database: process.env.SERVER_DATABASE,
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },
};
