const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baselineSchema = new Schema({
  userID: { type: String, required: true },
  week: { type: Number, required: true},
  walking: { type: Number , required: true },
  pushups: { type: Number, required: true },
  situps: { type: Number, required: true },
  squats: { type: Number, required: true },
  baselineComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
      type: Schema.Types.ObjectId,
      ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Baseline = mongoose.model("Baseline", baselineSchema);

module.exports = Baseline;