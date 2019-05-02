const router = require("express").Router();
const progressController = require("../../controllers/progressController");

// Matches with "/api/progress/"
router.route("/")
    .get(progressController.getProgress)
    .post(progressController.updateProgress)
    // .put(progressController.updateProgress)
    // .delete(progressController.remove);

module.exports = router;