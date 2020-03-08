
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = {
  getAllHomeServ: async function(key, next) {
    try {
      let setting = await Setting.findAndCountAll({
        order: [["createdAt", "DESC"]]
      });
      let banner = await Banner.findAndCountAll({
        where: { pagename: key.home },
        order: [["createdAt", "DESC"]]
      });
      let topDeal = await TopDeal.findAndCountAll({
        order: [["createdAt", "DESC"]]
      });
      let directDeal = await DirectDeal.findAndCountAll({
        order: [["createdAt", "DESC"]]
      });
      return {
        setting,
        banner,
        topDeal,
        directDeal
      };
    } catch (err) {
      next(err);
    }
  }
};
