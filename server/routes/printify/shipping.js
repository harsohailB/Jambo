const printifyConfig = require("../../printifyConfig");

var express = require("express");
var router = express.Router();

var axios = require("axios");
require("dotenv").config();

/* Shipping cost for a printify item */
// POST /v1/shops/{shop_id}/orders/shipping.json
router.post("/shipping", async function (req, res, next) {
  const url =
    printifyConfig.endpoint +
    "/shops/" +
    process.env.PRINTIFY_SHOP_ID +
    "/orders/shipping.json";

  console.log(url);

  const response = await axios
    .post(url, req.body, {
      headers: {
        Authorization: "Bearer " + process.env.PRINTIFY_AUTH_KEY,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({ message: err.message, status: err.status });
    });
});

module.exports = router;

// Example body:
// {
// {
//     "line_items": [{
//         "product_id": "5de5dd455bedac3f1644c55f",
//         "variant_id": 45172,
//         "quantity": 1
//     }],
//     "address_to": {
//         "first_name": "John",
//         "last_name": "Smith",
//         "email": "example@msn.com",
//         "phone": "0574 69 21 90",
//         "country": "BE",
//         "region": "",
//         "address1": "ExampleBaan 121",
//         "address2": "45",
//         "city": "Retie",
//         "zip": "2470"
//     }
// }
