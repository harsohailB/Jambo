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

/************AUTHORIZATION***************/

const isAuthorizableRequest = (req) => {
  if (req.method === "GET" && req.originalUrl.split("/").includes("emails")) {
    return true;
  }

  if (req.originalUrl === "/emails" && req.method === "POST") {
    return false;
  }

  if (req.originalUrl === "/session_id") {
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

/****************************************/

/************IMAGE UPLOAD ROUTE**********/

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const inventoryPath = "src/assets/catalog/inventory";

server.post("/create-folder", (req, res) => {
  fs.mkdir(
    path.join(__dirname, inventoryPath + "/" + req.body.folderName),
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully!");
    }
  );
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, inventoryPath + "/" + req.query.folderName);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("file");

server.post("/upload", (req, res) => {
  console.log(req.query);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

/*************************************/

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
      success_url: "http://localhost:3000/success",
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
const PORT = process.env.PORT || 3001;
server.use(router);
server.listen(PORT, () => {
  console.log("JAMBO back-end server is running on port " + PORT);
});
