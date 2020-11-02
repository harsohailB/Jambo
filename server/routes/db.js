const faunadb = require("faunadb");
require("dotenv").config();

const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY,
});

module.exports = client;
