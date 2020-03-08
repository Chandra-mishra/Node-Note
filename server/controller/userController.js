const userServ = require("../services/userService");
const utils = require("../utils/utils");
const multer = require("multer");
const upload = multer({ dest: "uploads/temp" });
const fs = require("fs");
module.exports = {
  add: async function(req, res, next) {
    let result = await userServ.add(req.body, req.currUser, next);
    utils.sendResponse(result, req, res);
  },

  login: async function(req, res, next) {
    let result = await userServ.login(req.body.email, req.body.password, next);
    utils.sendResponse(result, req, res);
  },

  list: async function(req, res, next) {
    let { start, length } = req.params;
    let result = await userServ.list(
      parseInt(start),
      parseInt(length),
      req.body,
      next
    );
    utils.sendResponse(result, req, res);
  },

  get: async function(req, res) {
    let { id } = req.params;
    let result = await userServ.get(id);
    utils.sendResponse(result, req, res);
  },

  edit: async function(req, res, next) {
    let result = await userServ.edit(req.body, req.currUser, next);
    utils.sendResponse(result, req, res);
  },

  delete: async function(req, res, next) {
    let result = await userServ.delete(req.params.id, next);
    utils.sendResponse(result, req, res);
  }
};
