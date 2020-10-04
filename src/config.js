// TODO comment in the production code and comment out the development code when deployed
// Production
// let config = {
//   api: {
//     protocol: "https",
//     host: "jambo-backend.herokuapp.com",
//   },
// };

// config.endpoint = config.api.protocol + "://" + config.api.host;

// module.exports = config;

// Local Development
let config = {
  api: {
    protocol: "http",
    host: "localhost",
    port: 3001,
  },
};

config.endpoint =
  config.api.protocol + "://" + config.api.host + ":" + config.api.port;

module.exports = config;
