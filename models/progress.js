const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// const exerciseSchema = new Schema ({
//     walking: []
//     // pushups: [],
//     // situps: [],
//     // squats: []
// });

// const weekSchema = new Schema({
//     week: Number,
//     exercises: [exerciseSchema]
//     // pushups: [],
//     // situps: [],
//     // squats: []
//     // exercises: [exerciseSchema]    
// });

const progressSchema = new Schema({
    userID: { type: String, required: true },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    // weeks: []
    walking: [],
    // pushups: [],
    // situps: [],
    // squats: []
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;