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
    updateAvgRating(location._id);
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

async function updateAvgRating(locationId) {
  try {
    loc = await Loc.findById(locationId)
      .select('rating reviews')
      .exec();
    setAvgRating(loc);
  } catch (err) {
    console.log(err);
  }
}

async function setAvgRating(location) {
  if (location.reviews && location.reviews.length > 0) {
    const count = location.reviews.length;
    const total = location.reviews.reduce((acc, {rating}) => {
      return acc + rating;
    }, 0);
    location.rating = parseInt(total/count, 10);
    try {
      await location.save();
      console.log(`avg rating updated to ${location.rating}`);
    } catch(err) {
      console.log(err);
    }
  }
}
async function reviewsUpdateOne(req, res){
  if (!req.params.locationId || !req.params.reviewId) {
    return res
      .status(404)
      .json({
        "message": "not found: locationId and reviewId are both required"
      });
  }
  try {
    const location = await Loc
      .findById(req.params.locationId)
      .select('reviews')
      .exec();
    if(!location) {
      return res
        .status(404)
        .json({"message":"location not found"});
    }
    if(location.reviews && location.reviews.length > 0) {
      const review = location.reviews.id(req.params.reviewId);
      if(!review) {
        return res
          .status(404)
          .json({"message":"review not found"});
      } else {
        review.author = req.body.author;
        review.rating = req.body.rating;
        review.reviewText = req.body.reviewText;
        location.save();
        updateAvgRating(location._id);
        return res
          .status(200)
          .json(review);
      }
    }
  } catch(err) {
    return res
      .status(400)
      .json({
        "message":"An error has occurred",
        "Error":err
      });
  }
};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};