let config = {
    api: {
      protocol: "http",
      host: "localhost",
      port: 3001
    }
  };
  
  config.endpoint =
    config.api.protocol +
    "://" +
    config.api.host +
    ":" +
    config.api.port;
  
module.exports = config;