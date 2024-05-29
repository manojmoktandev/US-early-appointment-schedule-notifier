const express =  require('express');
const availableDates = require('./available.dates.route');
const home = require('./home.route');

const router = express.Router();

router.use('/',home);
router.use('/available-dates',availableDates);

module.exports = router;