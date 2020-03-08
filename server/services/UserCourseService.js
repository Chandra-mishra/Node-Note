const UserCourse = require("../models/userCourse");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
  save: async function(usercourse, next) {
    let result = null;

    try {
      if (usercourse.id) {
        result = result = await UserCourse.update(
          {
            ...usercourse
          },
          { where: { id: usercourse.id } }
        );
        if (result.includes(1)) {
          result = "Updated Successfully";
        } else {
          result = "Something went wrong try again";
        }
      } else {
        result = await UserCourse.create(usercourse);
      }
    } catch (err) {
      next(err);
    }
    return result;
  },
  delete: async function(id, next) {
    let result = null;
    try {
      result = await UserCourse.destroy({ where: { id: id } });
    } catch (err) {
      next(err);
    }
    return result;
  },
  listAll: async function(start, length, searchQry, next) {
    try {
      let whereClause = {};
      Object.keys(searchQry).forEach(el => {
        whereClause[el] = { [Op.like]: "%" + searchQry[el] + "%" };
        console.log(searchQry[el], "dd");
      });
      result = await UserCourse.findAndCountAll({
        where: whereClause,
        offset: start,
        limit: length,
        order: [["createdAt", "DESC"]]
      });
      return result;
    } catch (err) {
      next(err);
    }

    return result;
  },
  getDetail: async function(id, next) {
    let result = null;
    try {
      result = await UserCourse.findOne({ where: { id } });

      return result;
    } catch (err) {
      next(err);
    }
  },
};
