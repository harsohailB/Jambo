var express = require("express");
var router = express.Router();

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const success_url = "http://localhost:3000/success";
const cancel_url = "http://localhost:3000/cart";

/* POST - Generate a stripe session id for a customer */
router.get("/session_id", async function (req, res, next) {
  let session = await stripe.checkout.sessions
    .create({
      shipping_address_collection: {
        allowed_countries: ["CA"],
      },
      payment_method_types: ["card"],
      line_items: req.body.line_items,
      success_url,
      cancel_url,
    })
    .catch((err) => {
      throw err;
    });
  res.json(session.id);
});

module.exports = router;
