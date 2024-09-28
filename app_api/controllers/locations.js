const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

async function locationsListByDistance(req, res) {
  const locations = await Loc
    .find()
    .exec();
  return res
    .status(200)
    .json(locations);
};
const locationsCreate = (req, res) => {
  res
    .status(200)
    .json({"status": "locationsCreate: post success"});
};
async function locationsReadOne (req, res) { 
  try {
      const location = await Loc
      .findById(req.params.locationId)
      .exec();
    if (!location) {
      return res
      .status(404)
      .json({"message": "location not found"});
    } else {
    return res
      .status(404)
      .json(location);
    }
  } catch (err) {
    return res.status(200).json({"message": "invalid id input"});
  }
}

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