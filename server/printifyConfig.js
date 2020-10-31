let printifyConfig = {
  api: {
    protocol: "https",
    host: "api.printify.com/v1",
  },
};

printifyConfig.endpoint =
  printifyConfig.api.protocol + "://" + printifyConfig.api.host;

module.exports = printifyConfig;
