const router = require("express").Router();
const exercisesController = require("../../controllers/exercisesController");

// Matches with "/api/exercises"
router.route("/")
  .get(exercisesController.findAll)
  .post(exercisesController.create);

// Matches with "/api/exercises/:id"
router
  .route("/:id")
  .delete(exercisesController.remove);

module.exports = router;