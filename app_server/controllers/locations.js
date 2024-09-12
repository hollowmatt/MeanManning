const homeList = (req, res) => {
  res.render('index', {title: 'Home Page' });
};

const locationInfo = (req, res) => {
  res.render('index', {title: 'Detail Page' });
};

const addReview = (req, res) => {
  res.render('index', {title: 'Add Review Page' });
};

module.exports = {
  homeList, 
  locationInfo,
  addReview
};