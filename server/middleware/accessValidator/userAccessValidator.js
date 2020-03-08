const util = require("../../utils/utils");

module.exports = {
  addAuth: function(req, res, next) {
    if (req.currUser.role == "admin") {
      next();
    } else {
      res.status(403);
      res.send({ error: "Permission Denied!" });
    }
  },

  editAuth: function(req, res, next) {
    if (req.currUser.role == "admin") {
      next();
    } else {
      res.status(403);
      res.send({ error: "Permission Denied!" });
    }
  },

  getAuth: function(req, res, next) {
    next();
  },

  listAuth: function(req, res, next) {
    next();
  },

  deleteAuth: function(req, res, next) {
    try {
      if (req.currUser.role == "admin") {
        next();
      } else {
        throw Error("Permission Denied");
      }
    } catch (err) {
      next(err);
    }
  }
};
