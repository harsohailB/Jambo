var express = require("express");
var router = express.Router();

require("dotenv").config();

/* GET Login for Jambo Owner */
router.get("/login", async function (req, res, next) {
  const username = req.query.username;
  const password = req.query.password;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
