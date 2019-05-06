const router = require("express").Router();
const baselineController = require("../../controllers/baselineController");

// Matches with "/api/baseline"
router.route("/")
  .get(baselineController.getBaseline)
  .post(baselineController.create)

module.exports = router;