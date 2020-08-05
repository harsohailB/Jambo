// Server setup
const jsonServer = require("json-server");
const { readSync } = require("fs");
const { RSA_NO_PADDING } = require("constants");
const server = jsonServer.create();
const dbPath = "./src/assets/catalog/inventoryData.json";
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();
require("dotenv").config();

// Set default middlewares
server.use(middlewares);

const isAuthorizableRequest = (req) => {
  if (req.method === "GET" && req.originalUrl === "/emails") {
    return true;
  }

  if (req.originalUrl === "/session_id" || req.originalUrl === "/emails") {
    return false;
  } else {
    return (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE" ||
      req.method === "PATCH"
    );
  }
};

const isAuthorized = (req) => {
  // TODO use env for store username and password
  return (
    req.query.username === process.env.ADMIN_USERNAME &&
    req.query.password === process.env.ADMIN_PASSWORD
  );
};

// Server POST, PUT, DELETE, PATCH auth
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (isAuthorizableRequest(req) && !isAuthorized(req)) {
    res.sendStatus(401);
  } else {
    next();
  }
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Stripe checkout session route
server.post("/session_id", async (req, res) => {
  let session = await stripe.checkout.sessions
    .create({
      shipping_address_collection: {
        allowed_countries: ["CA"],
      },
      payment_method_types: ["card"],
      line_items: req.body.line_items,
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/cart",
    })
    .catch((err) => {
      throw err;
    });
  res.jsonp(session.id);
});

/******** Email subscribe route ************/
const emailAlreadyExists = (email) => {
  let result = false;
  const db = router.db;
  const currentEmails = db.__wrapped__.emails;
  currentEmails.forEach((currEmail) => {
    if (currEmail.email === email) {
      result = true;
    }
  });
  return result;
};

server.post("/emails", async (req, res, next) => {
  if (!emailAlreadyExists(req.body.email)) {
    next();
  } else {
    res.sendStatus(409);
  }
});
/**************************************** */

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log("JAMBO back-end server is running");
});
