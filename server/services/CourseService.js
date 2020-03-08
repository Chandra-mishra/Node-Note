const Course = require("../models/Course");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  save: async function(course, next) {
    let result = null;

    try {
      if (course.id) {
        result = result = await Course.update(
          {
            ...course
          },
          { where: { id: course.id } }
        );
        if (result.includes(1)) {
          result = "Updated Successfully";
        } else {
          result = "Something went wrong try again";
        }
      } else {
        result = await Course.create(course);
      }
    } catch (err) {
      console.log(err,"////")
      next(err);
    }
    return result;
  },
  delete: async function(id, next) {
    let result = null;
    try {
      result = await Course.destroy({ where: { id: id } });
    } catch (err) {
      next(err);
    }
    return result;
  },
  listAll: async function(start, length, searchQry, next) {
    console.log(start, length, searchQry, next)
    try {
      let whereClause = {};
      Object.keys(searchQry).forEach(el => {
        whereClause[el] = { [Op.like]: "%" + searchQry[el] + "%" };
        console.log(searchQry[el], "dd");
      });
      result = await Course.findAndCountAll({
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
      result = await Course.findOne({ where: { id } });

      return result;
    } catch (err) {
      next(err);
    }
  },
  getCertainValues: async function(keys) {
    let result = null;
    try {
      result = await Course.find({ title: { $in: keys } });
    } catch (err) {
      next(err);
    }
  }
};
