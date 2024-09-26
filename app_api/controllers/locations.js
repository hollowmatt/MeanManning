const locationsListByDistance = (req, res) => {
  res
    .status(200)
    .json({"location":"stub"});
};
const locationsCreate = (req, res) => {
  res
    .status(200)
    .json({"status": "success"});
};
const locationsReadOne = (req, res) => {};
const locationsUpdateOne = (req, res) => {};
const locationsDeleteOne = (req, res) => {};

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};