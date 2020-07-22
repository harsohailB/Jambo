// Server setup
const jsonServer = require("json-server");
const { readSync } = require("fs");
const { RSA_NO_PADDING } = require("constants");
const server = jsonServer.create();
const dbPath = "./src/assets/catalog/inventoryData.json";
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Set default middlewares
server.use(middlewares);

/************AUTHORIZATION***************/

const isAuthorizableRequest = (req) => {
  return (
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "DELETE" ||
    req.method === "PATCH"
  );
};

const isAuthorized = (req) => {
  // TODO use env for store username and password
  return req.query.username === "admin" && req.query.password === "password";
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

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log("JAMBO back-end server is running");
});
