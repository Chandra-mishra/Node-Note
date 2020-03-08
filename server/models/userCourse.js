let Sequelize = require("sequelize");

const usercourse = sequelize.define("usercourse", {
  user_id: {
    type: Sequelize.NUMBER
  },
  course_id:{
    type: Sequelize.NUMBER
  }
});
module.exports = usercourse;