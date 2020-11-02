const { body, validationResult } = require("express-validator");

const itemValidationRules = () => {
  return [
    body("isPrintifyItem").exists(),
    body("id").exists(),
    body("name").exists(),
    body("description").exists(),
    body("price").isFloat(),
    body("featured").exists(),
    body("tags").isArray(),
    body("thumbnailImage").exists(),
    body("colors").isArray(),
    body("sizes").isArray(),
    body("images").isArray(),
  ];
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
  itemValidationRules,
  validate,
};
