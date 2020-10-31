const printifyConfig = require("../../printifyConfig");

var express = require("express");
var router = express.Router();

var axios = require("axios");
require("dotenv").config();

const { ensureAuthenticated } = require("../auth");

/* GET an all items from Printify */
router.get("/items", ensureAuthenticated, async function (req, res, next) {
  const url =
    printifyConfig.endpoint +
    "/shops/" +
    process.env.PRINTIFY_SHOP_ID +
    "/products.json";

  const response = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + process.env.PRINTIFY_AUTH_KEY,
      },
    })
    .catch((err) => {
      res.json({ message: err.message, status: err.requestResult.statusCode });
    });

  res.json(response.data);
});

/* GET an item from Printify */
router.get("/items/:id", ensureAuthenticated, async function (req, res, next) {
  const url =
    printifyConfig.endpoint +
    "/shops/" +
    process.env.PRINTIFY_SHOP_ID +
    "/products/" +
    req.params.id +
    ".json";

  const response = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + process.env.PRINTIFY_AUTH_KEY,
      },
    })
    .catch((err) => {
      res.json({ message: err.message, status: err.requestResult.statusCode });
    });

  res.json(response.data);
});

module.exports = router;
