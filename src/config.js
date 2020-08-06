let config = {
  api: {
    protocol: "http",
    host: "10.0.0.129",
    port: 3001,
  },
};

config.endpoint =
  config.api.protocol + "://" + config.api.host + ":" + config.api.port;

module.exports = config;
