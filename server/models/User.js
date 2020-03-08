let Sequelize = require("sequelize");

const User = sequelize.define(
  "user",
  {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    phone: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: "user"
    },
    password: {
      type: Sequelize.STRING
    },
    course:{
      type: Sequelize.NUMBER
    }
  },
  { defaultScope: { attributes: { exclude: ["password"] } } }
);
module.exports = User;
