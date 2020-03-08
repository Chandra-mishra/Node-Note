const Joi = require("@hapi/joi");
module.exports = {
  add: async (req, res, next) => {
    const schema = await Joi.object({
      first_name: Joi.string().error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "string.base":
              err.message = `First name should be a string`;
              break;
            case "any.required":
              err.message = `First Name can't be blank`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
      last_name: Joi.string().allow(""),
      email: Joi.string()
        .email()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.email":
                err.message = `Email must be valid`;
                break;
              case "any.required":
                err.message = `Email can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .allow("")
        .regex(/^[a-zA-Z0-9@#$%]{3,30}$/)
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.regex.base":
                err.message = `Password length should be atleast 2 and atmost 30 character long`;
                break;
              case "any.required":
                err.message = `Password can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      phone: Joi.string(),
      role: Joi.string().allow("")
    });

    try {
      //const value = await schema.validateAsync(req.body);
      await schema.validateAsync(req.body, { allowUnknown: true });
      next();
    } catch (err) {
      next(err);
    }
  },

  edit: async (req, res, next) => {
    console.log(req.body, "dfvdgdfggdf");
    const schema = await Joi.object({
      first_name: Joi.string().error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "string.base":
              err.message = `First name should be a string`;
              break;
            case "any.required":
              err.message = `First Name can't be blank`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
      last_name: Joi.string().allow(""),
      email: Joi.string()
        .email()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.email":
                err.message = `Email must be valid`;
                break;
              case "any.required":
                err.message = `Email can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .allow("")
        .regex(/^[a-zA-Z0-9@#$%]{3,30}$/)
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.regex.base":
                err.message = `Password length should be atleast 2 and atmost 30 character long`;
                break;
              case "any.required":
                err.message = `Password can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      phone: Joi.string(),
      role: Joi.string().allow("")
    });

    try {
      //const value = await schema.validateAsync(req.body);
      await schema.validateAsync(req.body, { allowUnknown: true });
      next();
    } catch (err) {
      next(err);
    }
  }
};
