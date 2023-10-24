const Router = require('express').Router;
const router = new Router();
const bookingsController = require('../controller/controller');
const teackets = require('../controller/teackets');

router.get('/bookings', bookingsController.getBookings);
router.get('/number-passenger-fligths', teackets.numberPassengerFlights);


module.exports = router;