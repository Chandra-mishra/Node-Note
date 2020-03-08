const Tags = require("../models/Tags");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
  save: async function(tag, next) {
    let result = null;

    try {
      if (tag.id) {
        result = result = await Tags.update(
          {
            ...tag
          },
          { where: { id: tag.id } }
        );
        if (result.includes(1)) {
          result = "Updated Successfully";
        } else {
          result = "Something went wrong try again";
        }
      } else {
        result = await Tags.create(tag);
      }
    } catch (err) {
      next(err);
    }
    return result;
  },
  delete: async function(id, next) {
    let result = null;
    try {
      result = await Tags.destroy({ where: { id: id } });
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
      result = await Tags.findAndCountAll({
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
      result = await Tags.findOne({ where: { id } });

      return result;
    } catch (err) {
      next(err);
    }
  },
};

// User.sync({ force: true }).then(async function() {
//       let r = await User.create(user);
//       console.log(r, "ddsssd");
//     });
