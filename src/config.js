const dotenv = require("dotenv");

console.log(process.env);
var config;

if (process.env.NODE_ENV === "development") {
  config = {
    api: {
      protocol: "http",
      host: "localhost",
      port: 9000,
    },
  };
} else {
  config = {
    api: {
      protocol: "https",
      host: "jambo-express-backend.herokuapp.com",
    },
  };
}

console.log(config);

config.endpoint =
  config.api.protocol + "://" + config.api.host + ":" + config.api.port;

module.exports = config;
