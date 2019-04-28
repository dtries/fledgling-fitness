const router = require("express").Router();
const baselineController = require("../../controllers/baselineController");

// Matches with "/api/baseline"
router.route("/")
  .get(baselineController.findAll)
  .post(baselineController.create);

// Matches with "/api/baseline/:id"
// router
//   .route("/:id")
//   .post(baselineController.create)
//   .delete(baselineController.remove);

module.exports = router;