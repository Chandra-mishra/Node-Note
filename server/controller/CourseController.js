const courseServ = require("../services/CourseService");
const utils = require("../utils/utils");
const multer = require("multer");
const upload = multer({ dest: "uploads/temp" });
const fs = require("fs");

module.exports = {
  add: async function(req, res,next) {
    if (req.file) {
      const tmp_path = req.file.path;
      const file_final_name =
        new Date().getTime() + "_" + req.file.originalname;
      const final_path =
        process.env.ROOT_PATH + process.env.IMAGE_DESTINATION + file_final_name;
      final_url =
        process.env.API_URL + process.env.IMAGE_DESTINATION + file_final_name;
      fs.rename(tmp_path, final_path, err => {
        if (err) {
          return "File linking failed";
        }
      });
      req.body.image = final_url;
    }
    console.log(req.body,"/////")
    let result = await courseServ.save(req.body, req.currUser, next);
    utils.sendResponse(result, req, res);
  },

  edit: async function(req, res,next) {
    
    if (req.file) {
      const tmp_path = req.file.path;
      const file_final_name =
        new Date().getTime() + "_" + req.file.originalname;
      const final_path =
        process.env.ROOT_PATH + process.env.IMAGE_DESTINATION + file_final_name;
      final_url =
        process.env.API_URL + process.env.IMAGE_DESTINATION + file_final_name;
      fs.rename(tmp_path, final_path, err => {
        if (err) {
          return "File linking failed";
        }
      });
      req.body.userImagePath = final_url;
    }
    let result = await courseServ.save(req.body, req.currUser, next);
    utils.sendResponse(result, req, res);
  },

  delete: async function(req, res) {
    let result = await courseServ.delete(req.params.id);
    utils.sendResponse(result, req, res);
  },

  list: async function(req, res, next) {
    let { start, length } = req.params;
    let result = await courseServ.listAll(
      parseInt(start),
      parseInt(length),
      req.body,
      next
    );
    utils.sendResponse(result, req, res);
  },
  getDetail: async function(req, res) {
    let result = await courseServ.getDetail(req.params.id);
    utils.sendResponse(result, req, res);
  }
};
