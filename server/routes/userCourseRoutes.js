const router = require("express").Router();
const UserCourseController = require("../controller/userCourseController");
const auth = require("../middleware/auth");
const checkPermission = require("../middleware/accessValidator/userCourseAccessValidator");

router
  .route("/")
  .post(auth, checkPermission.addAuth, UserCourseController.add)
  .put(auth, checkPermission.editAuth, UserCourseController.edit);

// router.route("/getcertainfeilds").get(faqController.);

router
  .route("/list/:start/:length")
  .post(UserCourseController.listAll);

router
  .route("/:id")
  .delete(auth, checkPermission.deleteAuth, UserCourseController.delete)
  .get(auth, checkPermission.getAuth, UserCourseController.getDetail);

module.exports = router;