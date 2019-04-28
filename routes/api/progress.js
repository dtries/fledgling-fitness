const router = require("express").Router();
const progressController = require("../../controllers/progressController");

// Matches with "/api/progress"
// router.route("/")
//   .get(progressController.findAll)
//   .post(progressController.create);

// Matches with "/api/progress/:id"
router.route("/:id")
    .get(progressController.findAll)
    .post(progressController.create)
    // .put(progressController.put)
    .delete(progressController.remove);

module.exports = router;