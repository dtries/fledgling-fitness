import axios from "axios";

export default {
//  Gets all baseline infor from database
  getBaseline: function(userID) {
      console.log(`API baselineID is ${JSON.stringify(userID.userID)}`);
    return axios.get("/api/baseline/",
    {
        params: {
            userID: userID.userID
        }
    }
    )
  },

//   Updates week in baseline from 0 to 1
  updateBaselineWeek: function() {
      return axios.put("/api/baseline");
  },
  // Saves a baseline info to the database
  saveBaseline: function(baselineData) {
    return axios.post("/api/baseline/", baselineData);
  },

  updateProgress: function(workoutData) {
      return axios.post("/api/progress", workoutData);
  }

};