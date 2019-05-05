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

  updateWalking: function(workoutData) {
      return axios.post("/api/progress/walking", workoutData);
  },

  updatePushups: function(workoutData) {
    return axios.post("/api/progress/pushups", workoutData);
  },

  updateSitups: function(workoutData) {
    return axios.post("/api/progress/situps", workoutData);
  },

  updateSquats: function(workoutData) {
    return axios.post("/api/progress/squats", workoutData);
  },

  getProgress: function(userID) {
    console.log(`API check collections baselineID is ${JSON.stringify(userID.userID)}`);
    return axios.get("/api/progress/", 
        {
            params: {
                userID: userID.userID
            }
        }
    )
  },

  removeNullWalking: function(userID) {
      return axios.delete("/api/progress/walking/", 
      {
          params: {
              userID: userID.userID
          }
      }
    )
  }
  

};