const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");
const loginDataVd = require("../middleware/dataValidator/loginDataValidator");
const userAccessVd = require("../middleware/accessValidator/userAccessValidator");
const userDataVd = require("../middleware/dataValidator/userDataValidator");
const multer = require("multer");
const upload = multer({
  dest: process.env.ROOT_PATH + process.env.TEMP_PATH
});

router
  .route("/")
  .post(upload.single("userImagePath"), userDataVd.add, userController.add)
  .put(
    upload.single("userImagePath"),
    userDataVd.edit,
    auth,
    userController.edit
  );

router
  .route("/:id")
  .get(auth, userAccessVd.getAuth, userController.get)
  .delete(auth, userAccessVd.deleteAuth, userController.delete);

router.route("/login").post(loginDataVd.login, userController.login);

router
  .route("/list/:start/:length")
  .post(auth, userAccessVd.listAuth, userController.list);

module.exports = router;
