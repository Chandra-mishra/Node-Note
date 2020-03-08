const router = require("express").Router();
const TagController = require("../controller/TagController");
const auth = require("../middleware/auth");
const checkPermission = require("../middleware/accessValidator/tagAccessValidator");

router
  .route("/")
  .post(auth, checkPermission.addAuth, TagController.add)
  .put(auth, checkPermission.editAuth, TagController.edit);

// router.route("/getcertainfeilds").get(faqController.);

router
  .route("/list/:start/:length")
  .post(TagController.listAll);

router
  .route("/:id")
  .delete(auth, checkPermission.deleteAuth, TagController.delete)
  .get(auth, checkPermission.getAuth, TagController.getDetail);

module.exports = router;