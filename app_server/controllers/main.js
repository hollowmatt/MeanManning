const index = (req, res) => {
  res.render('index', { title: 'Express Matt' });
};

module.exports = {
  index
};