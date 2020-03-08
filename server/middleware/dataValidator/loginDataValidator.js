const Joi = require("@hapi/joi");
module.exports = {
  login: async (req, res, next) => {
    const schema = await Joi.object({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string().required()
    });
    try {
      await schema.validateAsync({
        email: req.body.email,
        password: req.body.password
      });

      next();
    } catch (err) {
      next(err);
    }
  }
};
