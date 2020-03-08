const CourseTag = require("../models/courseTag");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
  save: async function(coursetag, next) {
    let result = null;

    try {
      if (coursetag.id) {
        result = result = await CourseTag.update(
          {
            ...coursetag
          },
          { where: { id: coursetag.id } }
        );
        if (result.includes(1)) {
          result = "Updated Successfully";
        } else {
          result = "Something went wrong try again";
        }
      } else {
        result = await CourseTag.create(coursetag);
      }
    } catch (err) {
      next(err);
    }
    return result;
  },
  delete: async function(id, next) {
    let result = null;
    try {
      result = await CourseTag.destroy({ where: { id: id } });
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
      result = await CourseTag.findAndCountAll({
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
      result = await CourseTag.findOne({ where: { id } });

      return result;
    } catch (err) {
      next(err);
    }
  },
};
