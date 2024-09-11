const users = (req, res) => {
  res.render('index', { title: 'Express Users' });
};

module.exports = {
  users
};