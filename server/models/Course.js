let Sequelize = require("sequelize");

const course = sequelize.define("course", {
  title: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  is_private: {
    type: Sequelize.BOOLEAN
  }
});
module.exports = course;

