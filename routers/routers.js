const Router = require('express').Router;
const router = new Router();
const bookingsController = require('../controller/controller');
const teackets = require('../controller/teackets');
const fligths = require('../controller/flights')

router.get('/bookings', bookingsController.getBookings);
router.get('/number-passenger-fligths', teackets.numberPassengerFlights);

//Место для комментария :)
router.get('/fligths/', fligths.getStatus);


module.exports = router;