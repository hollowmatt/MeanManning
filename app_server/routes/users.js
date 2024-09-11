var express = require('express');
var router = express.Router();
const ctrlUsers = require('../controllers/users');

/* GET users listing. */
router.get('/', ctrlUsers.users);

module.exports = router;
