const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

// Get Locations Pages
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationId', ctrlLocations.locationInfo);
router
  .route('/location/:locationId/review/new')
  .get(ctrlLocations.addReview)
  .post(ctrlLocations.doAddReview);

/* GET About page. */
router.get('/about', ctrlOthers.about);

module.exports = router;
