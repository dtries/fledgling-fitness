const router = require("express").Router();
const progressController = require("../../controllers/progressController");

// Matches with "/api/progress/"
router.route("/")
    .get(progressController.getProgress);

router.route("/walking")
    .post(progressController.updateWalking);

router.route("/pushups")
    .post(progressController.updatePushups);

router.route("/situps")
    .post(progressController.updateSitups);

router.route("/squats")
    .post(progressController.updateSquats);
    // .put(progressController.updateProgress)
    // .delete(progressController.remove);

module.exports = router;