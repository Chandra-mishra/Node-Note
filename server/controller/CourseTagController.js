const coursetagServ = require("../services/CourseTagService");
const utils = require("../utils/utils");

module.exports = {
  add: async function(req, res, next) {
    let result = await coursetagServ.save(req.body, next);
    utils.sendResponse(result, req, res);
  },

  edit: async function(req, res, next) {
    let result = await coursetagServ.save(req.body, next);
    utils.sendResponse(result, req, res);
  },

  delete: async function(req, res, next) {
    let result = await coursetagServ.delete(req.params.id, next);
    utils.sendResponse(result, req, res);
  },

  listAll: async function(req, res, next) {
    let { start, length } = req.params;
    let result = await coursetagServ.listAll(
      parseInt(start),
      parseInt(length),
      req.body,
      next
    );
    utils.sendResponse(result, req, res);
  },

  getDetail: async function(req, res, next) {
    let result = await coursetagServ.getDetail(req.params.id, next);
    utils.sendResponse(result, req, res);
  }
};
