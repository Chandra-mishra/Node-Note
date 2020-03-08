const User = require("../../models/user.model");
const util = require("../../utils/utils");
module.exports = {
  putAuth: async function(req, res, next) {
    if (
      util.checkRole(req.currUser, "admin") ||
      util.checkRole(req.currUser, "manager") ||
      (util.checkRole(req.currUser, "student") &&
        req.body._id == req.currUser.id)
    ) {
      next();
    } else {
      res.send("please you don't have a permission to edit the field");
    }
  },

  deleteAuth: async function(req, res, next) {
    if (
      util.checkRole(req.currUser, "admin") ||
      util.checkRole(req.currUser, "manager") ||
      (util.checkRole(req.currUser, "student") &&
        req.params.id == req.currUser.id)
    ) {
      next();
    } else {
      res.send("please you don't have a permission to delete the field");
    }
  },

  getDetailAuth: async function(req, res, next) {
    if (
      util.checkRole(req.currUser, "admin") ||
      util.checkRole(req.currUser, "manager") ||
      util.checkRole(req.currUser, "student")
    ) {
      next();
    } else {
      res.send("please you don't have a permission to get detail of the field");
    }
  },

  listAllAuth: function(req, res, next) {
    if (
      util.checkRole(req.currUser, "admin") ||
      util.checkRole(req.currUser, "manager") ||
      util.checkRole(req.currUser, "teacher")
    ) {
      next();
    } else {
      res.send("please you don't have a permission to get detail of the field");
    }
  }
};
