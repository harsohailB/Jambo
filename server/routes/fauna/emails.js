var express = require("express");
var router = express.Router();

require("dotenv").config();

const client = require("../db");
const q = require("faunadb").query;
const {
  emailValidationRules,
  validate,
} = require("./validators/emailValidator.js");
const { ensureAuthenticated } = require("../auth");

/* GET all email from Fauna */
router.get("/emails", ensureAuthenticated, async function (req, res, next) {
  client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allEmails"))),
        q.Lambda((email) => q.Get(email))
      )
    )
    .then((response) => {
      res.json(response.data.map((entity) => entity.data));
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "GET emails from FaunaDB",
        status: error.requestResult.statusCode,
      };
    });
});

/* POST an email to Fauna */
router.post("/emails", emailValidationRules(), validate, async function (
  req,
  res,
  next
) {
  client
    .query(
      q.Create(q.Collection("Email"), {
        data: {
          email: req.body.email,
        },
      })
    )
    .then((response) => {
      res.json({
        message: "Email successfully created on FaunaDB",
        status: 200,
      });
    })
    .catch((error) => {
      console.log("ERROR POST Email:", error.message);
      res.json({
        message: error.message,
        status: error.requestResult.statusCode,
      });
    });
});

/* DELETE an email from Fauna */
router.delete("/emails/:email", ensureAuthenticated, async function (
  req,
  res,
  next
) {
  client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("getEmail"), req.params.email)),
        q.Lambda((email) => q.Delete(email))
      )
    )
    .then((response) => {
      if (response.data.length) {
        res.json({
          message: "Email successfully deleted from FaunaDB",
          status: response.status,
        });
      } else {
        res.json({
          message: "Email not found on FaunaDB",
          status: 404,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: error.message,
        status: error.requestResult.statusCode,
      });
    });
});

module.exports = router;
