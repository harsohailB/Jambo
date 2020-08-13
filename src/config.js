let config = {
  api: {
    protocol: "https",
    host: "jambo-backend.herokuapp.com",
  },
};

config.endpoint = config.api.protocol + "://" + config.api.host;

module.exports = config;
