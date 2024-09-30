const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsCreate = (req, res) => {};

async function reviewsReadOne (req, res) {
  try {
    const location = await Loc
      .findById(req.params.locationId)
      .select('name reviews')
      .exec();
    if(!location) {
      return res
        .status(404)
        .json({"message": "location not found"});
    } else {
      if (location.reviews && location.reviews.length > 0) {
        const review = location.reviews.id(req.params.reviewId)
        if (!review) {
          return res
            .status(404)
            .json({"message": "review not found"});
        } else {
          response = {
            location : {
              name : location.name,
              id : req.params.locationId
            },
            review
          };
          return res
            .status(200)
            .json(response);
        }
      } 
    } 
  } catch (err) {
      return res
        .status(404)
        .json({"message": "invalid input", "error": err.message});
    }
}

const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};