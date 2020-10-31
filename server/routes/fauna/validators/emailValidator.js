const { body, validationResult } = require("express-validator");

const emailValidationRules = () => {
  return [body("email").exists()];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    errors,
  });
};

module.exports = {
  emailValidationRules,
  validate,
};
