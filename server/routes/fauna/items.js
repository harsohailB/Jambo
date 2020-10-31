var express = require("express");
var router = express.Router();

require("dotenv").config();

const client = require("../db");
const q = require("faunadb").query;

const {
  itemValidationRules,
  validate,
} = require("./validators/itemValidator.js");
const { ensureAuthenticated } = require("../auth");

/* GET an all items from FaunaDB */
router.get("/items", async function (req, res, next) {
  client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allItems"))),
        q.Lambda((item) => q.Get(item))
      )
    )
    .then((response) => {
      res.json(response.data.map((entity) => entity.data));
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: error.message,
        status: error.requestResult.statusCode,
      });
    });
});

/* GET an item from FaunaDB */
router.get("/items/:id", async function (req, res, next) {
  client
    .query(q.Get(q.Match(q.Index("getItemByID"), parseInt(req.params.id))))
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: error.message,
        status: error.requestResult.statusCode,
      });
    });
});

/* POST an item to FaunaDB */
router.post(
  "/items",
  itemValidationRules(),
  validate,
  ensureAuthenticated,
  async function (req, res, next) {
    client
      .query(
        q.Create(q.Collection("Item"), {
          data: req.body,
        })
      )
      .then((response) => {
        res.json({
          message: "Item successfully created on FaunaDB",
          status: response.status,
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          message: error.message,
          status: error.requestResult.statusCode,
        });
      });
  }
);

/* PUT an item to FaunaDB */
router.put(
  "/items/:id",
  itemValidationRules(),
  validate,
  ensureAuthenticated,
  async function (req, res, next) {
    client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index("getItemByID"), parseInt(req.params.id))),
          q.Lambda((item) =>
            q.Update(item, {
              data: req.body,
            })
          )
        )
      )
      .then((response) => {
        res.json({
          message: "Item successfully updated on FaunaDB",
          status: response.status,
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          message: error.message,
          status: error.requestResult.statusCode,
        });
      });
  }
);

/* DELETE an item from FaunaDB */
router.delete("/items/:id", ensureAuthenticated, async function (
  req,
  res,
  next
) {
  client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("getItemByID"), parseInt(req.params.id))),
        q.Lambda((item) => q.Delete(item))
      )
    )
    .then((response) => {
      res.json({
        message: "Item successfully deleted from FaunaDB",
        status: response.status,
      });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "DELETE an item from FaunaDB by id failed",
        status: error.requestResult.statusCode,
      };
    });
});

module.exports = router;
