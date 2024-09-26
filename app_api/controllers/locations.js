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
  res
    .status(200)
    .json({"status": "locationsReadOne: get success"});
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