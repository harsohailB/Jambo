let config = {
  api: {
    protocol: "http",
    host: "localhost:3000",
  },
};

config.endpoint = config.api.protocol + "://" + config.api.host;

module.exports = config;
