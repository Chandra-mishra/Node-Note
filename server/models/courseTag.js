let Sequelize = require("sequelize");

const coursetag = sequelize.define("coursetag", {
  tag_id: {
    type: Sequelize.NUMBER
  },
  course_id:{
    type: Sequelize.NUMBER
  }
});
module.exports = coursetag;