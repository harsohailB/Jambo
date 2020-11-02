require("dotenv").config();

const ensureAuthenticated = (req, res, next) => {
  if (isAuthorized(req)) {
    return next();
  } else {
    res.sendStatus(401);
  }
};

const isAuthorized = (req) => {
  return (
    req.query.username === process.env.ADMIN_USERNAME &&
    req.query.password === process.env.ADMIN_PASSWORD
  );
};

module.exports = { ensureAuthenticated };
