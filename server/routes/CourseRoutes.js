const express = require("express");
const router = express.Router();
const courseController = require("../controller/CourseController");
const auth = require("../middleware/auth");
const courseAccessVd = require("../middleware/accessValidator/courseAccessValidator");
const courseDataVd = require("../middleware/dataValidator/courseDataValidator");
const multer = require("multer"); 
const upload = multer({
  dest: process.env.ROOT_PATH + process.env.TEMP_PATH
});

router
  .route("/")
  .post(upload.single("image"),auth,courseAccessVd.listAllAuth,courseDataVd.add,courseController.add)
  .put(
    upload.single("image"),
    auth,
    courseDataVd.edit,
    courseController.edit
  );

router
  .route("/:id")
  .get(auth, courseController.getDetail)
  .delete(auth, courseAccessVd.deleteAuth, courseController.delete);


router
  .route("/list/:start/:length")
  .post(auth,courseAccessVd.listAllAuth,courseController.list);

module.exports = router;