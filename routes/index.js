const path = require("path");
const router = require("express").Router();
const users = require("./api/users");
const exercises = require("./api/exercises");
const baseline = require("./api/baseline");
const progress = require("./api/progress");

// API Routes
router.use("/api/users", users);
router.use("/api/exercises", exercises);
router.use("/api/baseline", baseline);
router.use("/api/progress", progress);

// If no API routes are hit, send the React app
// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;