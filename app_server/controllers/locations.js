const dotenv = require('dotenv');
dotenv.config();
const API = process.env.API;
const homeList = (req, res) => {
  res.render('locations-list', {title: 'Home Page' });
};

const locationInfo = (req, res) => {
  res.render('location-info', 
    {
      title: 'Detail Page', 
      mapurl:`https://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2&key=${API}`
    });
};

const addReview = (req, res) => {
  res.render('location-review-form', {title: 'Add Review Page' });
};

module.exports = {
  homeList, 
  locationInfo,
  addReview
};