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
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to " + 
      "work when out and about. Perhaps with coffee, cake or a pint? " +
      "Let Loc8r help you find the place you're looking for.",
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
  res.render('location-info',{
      title: 'Detail Page', 
      pageHeader: {
        title: 'Starcups',
        rating: 3,
        address: '125 High Street, Reading, Rg6 1PS'
      },
      sidebarLead: "Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
      sidebarSub: "If you've been and you like it - or if you don't - please leave a review to help other people just like you.",
      pageBody: {
        storeInfo: {
          title: 'Opening Hours',
          weekdays: 'Monday - Friday: 7:00am - 7:00pm',
          saturdays: 'Saturday: 8:00am - 5:00pm',
          sundays: 'Sunday: closed'
        },
        facilities: {
          title: 'Facilities',
          amenities: ['Hot Drinks', 'Food', 'Premium WiFi']
        }, 
        location: {
          title: 'Location map',
          mapurl:`https://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2&key=${API}`
        }
      },
      reviews: [
        {
          rating: 3,
          author: 'Simon Holmes',
          date: '16 February, 2017',
          comment: 'What a great place'
        },
        {
          rating: 3,
          author: 'Charles Parker',
          date: '14 February, 2017',
          comment: 'Killer coffee'
        }
      ],
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