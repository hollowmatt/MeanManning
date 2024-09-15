const dotenv = require('dotenv');
dotenv.config();
const API = process.env.API;
const homeList = (req, res) => {
  res.render('locations-list', {
    title: 'Home Page',
    pageHeader: {
      title: 'Loc8r',
      strapLine: 'Find places to work with wifi near you'
    },
    locations: [{
      name: 'Starcups',
      address: '125 High Street, Reading, Rg6 1PS',
      rating: 3,
      facilities: ['Hot Drinks', 'Food', 'Premium WiFi'],
      distance: '100m'
    },
    {
      name: 'Cafe Hero',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 4,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '200m'
    },
    {
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 2,
      facilities: ['Food', 'Premium wifi'],
      distance: '250m'
    }]
  });
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