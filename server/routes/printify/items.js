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

  await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + process.env.PRINTIFY_AUTH_KEY,
      },
    })
    .then((response) => {
      let tempArr = [];
      response.data.data.forEach((item) => {
        try {
          tempArr.push(printifyItemParser(item));
        } catch {
          console.log("Failed to parse printify item" + item.title);
        }
      });
      res.json(tempArr);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
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
