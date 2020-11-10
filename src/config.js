const dotenv = require("dotenv");

var config;

if (process.env.NODE_ENV === "development") {
  config = {
    api: {
      protocol: "http",
      host: "localhost",
      port: 9000,
    },
  };

  config.endpoint =
    config.api.protocol + "://" + config.api.host + ":" + config.api.port;
} else {
  config = {
    api: {
      protocol: "https",
      host: "jambo-express-backend.herokuapp.com",
    },
  };

  config.endpoint = config.api.protocol + "://" + config.api.host;
}

module.exports = config;
