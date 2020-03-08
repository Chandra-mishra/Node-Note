const router = require("express").Router();
const CourseTagController = require("../controller/CourseTagController");
const auth = require("../middleware/auth");
const checkPermission = require("../middleware/accessValidator/coursetagAccessValidator");

router
  .route("/")
  .post(auth, checkPermission.addAuth, CourseTagController.add)
  .put(auth, checkPermission.editAuth, CourseTagController.edit);

// router.route("/getcertainfeilds").get(faqController.);

router
  .route("/list/:start/:length")
  .post(CourseTagController.listAll);

router
  .route("/:id")
  .delete(auth, checkPermission.deleteAuth, CourseTagController.delete)
  .get(auth, checkPermission.getAuth, CourseTagController.getDetail);

module.exports = router;