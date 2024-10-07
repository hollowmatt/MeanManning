const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

async function locationsListByDistance(req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  }
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 20000000000,
    limit: 10
  };
  try {
    const results = await Loc.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions
        }
      }
    ]);
    const locations = results.map(result => {
      return {
        _id: result._id,
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}`
      }
    });
    return res
      .status(200)
      .json(locations);
  } catch(err) {
    console.log(err);
    return res
      .status(404)
      .json(err);
  }
};

async function locationsCreate(req, res) {
  try {
    const location = await Loc.create({
      name: req.body.name,
      address: req.body.address,
      facilities: req.body.facilities.split(","),
      coords: [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat)
        ],
      openingTimes: [
        {
          days: req.body.days1,
          opening: req.body.opening1,
          closing: req.body.closing1,
          closed: req.body.closed1
        },
        {
          days: req.body.days2,
          opening: req.body.opening2,
          closing: req.body.closing2,
          closed: req.body.closed2
        }
      ]
    }) 
    if (!location) {
      return res
        .status(404)
        .json({"message": "location not saved"});
    } else {
      return res
        .status(200)
        .json({"message": "saved"});
    }
  } catch (err) {
    return res.status(400).json({"message": "invalid input", "error": err});
  }
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
      .status(200)
      .json(location);
    }
  } catch (err) {
    return res.status(404).json({"message": "invalid id input"});
  }
}

async function locationsUpdateOne(req, res) {
  if(!req.params.locationId) {
    return res
      .status(404)
      .json({"message":"Location not found - location ID required"});
  }
  try {
    location = await Loc
      .findById(req.params.locationId)
      .select('-reviews -rating')
      .exec();
    location.name = req.body.name;
    location.address = req.body.address;
    location.facilities = req.body.facilities.split(',');
    location.coords = [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ];
    location.openingTimes = [
      {
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },
      {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }
    ];
    location.save();
    return res
      .status(200)
      .json(location);
  } catch(err) {
    console.log(err);
  }
}
async function locationsDeleteOne(req, res) {
  if(!req.params) {
    return res
      .status(404)
      .json({"message":"Location not found - location ID required"});
  }
  try {
    const locId = req.params.locationId;
    console.log(locId);
    await Loc
      .findByIdAndDelete(locId)
      .exec();
    return res
      .status(200)
      .json({"status": "locationsDeleteOne: delete success"});
  } catch(err) {
    return res
      .status(400)
      .json({"message": "failed to delete"});
  }
}

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};