const dotenv = require('dotenv');
const request = require('request');
dotenv.config();
const API = process.env.API;
const apiOptions = {
  server: 'http://localhost:3000'
};

const homeList = (req, res) => {
  const path = '/api/locations';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    qs: {
      lng: -0.7992599,
      lat: 51.378091,
      maxDistance: 20
    }
  };
  request(requestOptions, 
    (err, response, body) => {
      let data = [];
      data = body.map((item) => {
        item.distance = formatDistance(item.distance);
        return item;
      });
      renderHomepage(req, res, data);
    }
  )
};

const locationInfo = (req, res) => {
  getLocationInfo(req, res, (req, res, data) => renderDetailPage(req, res, data));
};

const addReview = (req, res) => {
  renderReviewForm(req, res);
};

const doAddReview = (req, res) => {
  console.log("save me");
}

//private methods
const getLocationInfo = (req, res, callback) => {
  const path = `/api/locations/${req.params.locationId}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions, (err, {statusCode}, body) => {
      const data = body;
      if (statusCode === 200) {
        if(!body.coords) {
          console.log("no coords");
          return res
            .status(400)
            .json({"message":"no coordinates given: required"});
        }
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        };
        data.api = API;
        callback(req, res, data);
      } else {
        showError(req, res, statusCode);
      }
    }
  );
};

const showError = (req, res, status) => {
  let title = '';
  let content = '';
  if (status === 404) {
    title = '404, this is not the page you are looking for';
    content = 'Nothing to see here, move along, move along.';
  } else {
    title = `${status}: uh-oh`;
    content = 'somehow, somewhere, something went wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};

const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No places found nearby';
    }
  }
  res.render('locations-list',
    {
      title: 'Home Page',
        pageHeader: {
          title: 'Loc8r',
          strapLine: 'Find places to work with wifi near you'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to " + 
          "work when out and about. Perhaps with coffee, cake or a pint? " +
          "Let Loc8r help you find the place you're looking for.",
        locations: responseBody,
      message
    }
  );
};

const renderDetailPage = (req, res, location) => {
  res.render('location-info',
    {
      title: location.name,
       pageHeader: {
        title: `Loc8r: ${location.name}`,
      },
      sidebar: {
        context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
        callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
      },
      location: location
    }
  );
};

const renderReviewForm = (req, res) => {
  res.render('location-review-form', {
    title: 'New Review',
    pageHeader: {
      title: "New Review"
    }
  });
}

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if (distance > 1000) {
    thisDistance = parseFloat(distance / 1000).toFixed(1);
    unit = 'km';
  } else {
    thisDistance = Math.floor(distance);
  }
  return thisDistance + unit;
};

module.exports = {
  homeList, 
  locationInfo,
  addReview,
  doAddReview
};