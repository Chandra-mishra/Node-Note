const joi = require("joi");
const User = require("./userDataValidator");
const UserLogin = require("./userLoginValidator");

("use strict");
let validators = {
  User: {
    scopes: {
      default: User.userValidator
    }
  },
  UserLogin: {
    scopes: {
      default: UserLogin.loginValidator
    }
  }
};
function scopeExists(validator, scope) {
  return Object.keys(validator.scopes).find(key => key == scope) != undefined;
}
function getSchema(model, scope) {
  let validator = validators[model];
  if (!validator) {
    throw new Error("validator doesnot exist");
  }
  //first check if the given validator has multiple scope
  if (validator.scopes) {
    //if caller has passed a value for "scope"
    if (scope) {
      if (!scopeExists(validator, scope)) {
        throw new Error(`scope ${scope} does not exist in ${model} validator`);
      } else {
        return validator.scopes[scope];
      }
    } else {
      return validator.scopes.default;
    }
  } else {
    return validator;
  }
}
function validate(model, object, scope) {
  return joi.validate(object, getSchema(model, scope), {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  });
}
//Actual middleware factory
module.exports = function validationMiddleware(model, scope) {
  return (req, res, next) => {
    const validationResult = validate(model, req.body, scope);
    if (validationResult.error) {
      res.status(400).send({
        data: null,
        err: validationResult.error.details.map(details => details.message)
      });
    } else {
      next();
    }
  };
};
