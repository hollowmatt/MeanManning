const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

async function reviewsCreate(req, res) {
  const locId = req.params.locationId;
  if(locId) {
    try{
      const location = await Loc
        .findById(locId)
        .select('reviews')
        .exec();
      await doAddReview(req, res, location);
    } catch(err) {
      res
        .status(400)
        .json({"message": "fail to create", "error": err});
    }
  } else {
    res
      .status(404)
      .json({"message": "location not provided"});
  }
};
async function doAddReview(req, res, location) {
  console.log(req.body);
  if(!location) {
    res
      .status(404)
      .json({"message":"location not found"});
  } else {
    const {author, rating, reviewText} = req.body;
    location.reviews.push({
      author,
      rating,
      reviewText
    });
    location.save();
    res
      .status(201)
      .json({"message":"review added"});
  }
}
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