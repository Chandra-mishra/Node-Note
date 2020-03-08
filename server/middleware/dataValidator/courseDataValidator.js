const Joi = require("@hapi/joi");
module.exports = {
  add: async (req, res, next) => {
    const schema = await Joi.object({
      title: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.base":
                err.message = `Title should be a string`;
                break;
              case "any.required":
                err.message = `Title can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
        description: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.base":
                err.message = `Description should be a string`;
                break;
              case "any.required":
                err.message = `Description can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
        is_private: Joi.boolean().allow(""),
      image: Joi.string().allow("")
    });

    try {
      //const value = await schema.validateAsync(req.body);
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  },

  edit: async (req, res, next) => {
    const schema = await Joi.object({
      title: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.base":
                err.message = `Title should be a string`;
                break;
              case "any.required":
                err.message = `Title can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
        description: Joi.string()
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "string.base":
                err.message = `Description should be a string`;
                break;
              case "any.required":
                err.message = `Description can't be blank`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
        is_private: Joi.boolean().allow(""),
      image: Joi.string().allow(""),
      id: Joi.number().allow(""),
      createdAt: Joi.date().allow(""),
      updatedAt: Joi.date().allow("")
    });

    try {
      //const value = await schema.validateAsync(req.body);
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  },
};
