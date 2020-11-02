var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var loginRouter = require("./routes/users/login");
var faunaEmailsRouter = require("./routes/fauna/emails");
var faunaItemsRouter = require("./routes/fauna/items");
var printifyItemsRouter = require("./routes/printify/items");
var printifyShippingRouter = require("./routes/printify/shipping");
var stripeSessionsRouter = require("./routes/stripe/sessions");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(faunaEmailsRouter);
app.use(loginRouter);
app.use("/fauna", faunaItemsRouter);
app.use("/printify", printifyItemsRouter);
app.use(printifyShippingRouter);
app.use(stripeSessionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
