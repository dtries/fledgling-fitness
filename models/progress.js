const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    userID: { type: String, required: true },
    walking: [],
    pushups: [],
    situps: [],
    squats: []
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;