const router = require("express").Router();
const UtilsController = require("../controller/UtilsController");

router.route("/home").post(UtilsController.getHomeUtils); // get home page content like banner ,blog , setting

module.exports = router;
