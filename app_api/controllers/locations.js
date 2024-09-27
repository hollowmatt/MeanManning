const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsListByDistance = (req, res) => {
  res
    .status(200)
    .json({"status":"locationsListByDistance: get success"});
};
const locationsCreate = (req, res) => {
  res
    .status(200)
    .json({"status": "locationsCreate: post success"});
};
const locationsReadOne = (req, res) => { 
  Loc
    .findById(req.params.locationId)
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({"message": "location not found"});
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res
          .status(200)
          .json(location);
      }
    });
};
const locationsUpdateOne = (req, res) => {
  res
    .status(200)
    .json({"status": "locationsUpdateOne: put success"});
};
const locationsDeleteOne = (req, res) => {
  res
    .status(200)
    .json({"status": "locationsDeleteOne: delete success"});
};

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};