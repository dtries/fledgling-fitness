const db = require("../models");

// Defining methods for the progressController
module.exports = {
    getProgress: function(req, res) {
        db.Progress
          .findOne({
              "userID": req.query.userID
          })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    updateWalking: function(req, res) {
          console.log(`The update req body is ${JSON.stringify(req.body)}`);
        db.Progress.findOneAndUpdate(
            {userID: req.body.userID}, //filter to get specific user object from collection
            {$push: 
                {walking: [req.body.walking]}
            
            },                              
            {upsert: true, new:true}) //creates user object in collection if none exists
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },

    updatePushups: function(req, res) {
        console.log(`The update req body is ${JSON.stringify(req.body)}`);
      db.Progress.findOneAndUpdate(
          {userID: req.body.userID}, //filter to get specific user object from collection
          {$push: 
              {pushups: [req.body.pushups]}
          },                              
          {upsert: true, new:true}) //creates user object in collection if none exists
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },

    updateSitups: function(req, res) {
        console.log(`The update req body is ${JSON.stringify(req.body)}`);
    db.Progress.findOneAndUpdate(
        {userID: req.body.userID}, //filter to get specific user object from collection
        {$push: 
            {situps: [req.body.situps]
        }
        },                              
        {upsert: true, new:true}) //creates user object in collection if none exists
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    updateSquats: function(req, res) {
        console.log(`The update req body is ${JSON.stringify(req.body)}`);
    db.Progress.findOneAndUpdate(
        {userID: req.body.userID}, //filter to get specific user object from collection
        {$push: 
            {squats: [req.body.squats]}
        },                              
        {upsert: true, new:true}) //creates user object in collection if none exists
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
