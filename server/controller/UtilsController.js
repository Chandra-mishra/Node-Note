const UtilsServ = require("../services/UtilsService");
const utils = require("../utils/utils");

module.exports = {
  getHomeUtils: async function(req, res, next) {
    let result = await UtilsServ.getAllHomeServ(req.body, next);
    utils.sendResponse(result, req, res);
  }
};
