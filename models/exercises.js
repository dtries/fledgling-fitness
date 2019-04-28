const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exercisesSchema = new Schema({
//   title: { type: String, required: true },
//   authors: { type: [String], required: true },
//   synopsis: { type: String, required: true },
//   pic: String,
//   publisher:{ type: String, required: true },
//   titleId: { type: String, required: true },
//   link: { type: String, required: true },
//   date: {
//     type: Date,
//     default: Date.now
//   }
});

const Exercise = mongoose.model("Exercise", exercisesSchema);

module.exports = Exercise;