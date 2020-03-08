let Sequelize = require("sequelize");

const course = sequelize.define("tag", {
  name: {
    type: Sequelize.STRING
  },
});
module.exports = course;