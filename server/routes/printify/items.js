const printifyConfig = require("../../printifyConfig");

var express = require("express");
var router = express.Router();

var axios = require("axios");
require("dotenv").config();

const { ensureAuthenticated } = require("../auth");
const printifyItemParser = require("./printifyItemParser");

/* GET an all items from Printify */
router.get("/items", ensureAuthenticated, async function (req, res, next) {
  const itemsPage = req.query.page ? req.query.page : 1;
  const url =
    printifyConfig.endpoint +
    "/shops/" +
    process.env.PRINTIFY_SHOP_ID +
    "/products.json?page=" +
    itemsPage;

  const response = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + process.env.PRINTIFY_AUTH_KEY,
      },
    })
    .then((response) => {
      res.json(response.data.data.map((item) => item));
    })
    .catch((err) => {
      res.json({ message: err.message, status: err.requestResult.statusCode });
    });
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
    .then((response) => {
      res.json(printifyItemParser(response.data));
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, status: 404 });
    });
});

module.exports = router;
