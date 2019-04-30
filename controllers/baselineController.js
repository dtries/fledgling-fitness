const db = require("../models");

// Defining methods for the exercisesController
module.exports = {
  getBaseline: function(req, res) {
    db.Baseline
      .findOne({
          "userID": req.query.userID
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
      console.log(`The req body is ${JSON.stringify(req.body)}`);
    db.Baseline
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateBaselineWeek: function (req, res) {
    console.log(`The req body week is ${JSON.stringify(req.body.week)}`);

    db.Baseline
      .update(req.body.week)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
//   remove: function(req, res) {
//     db.Baseline
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};

