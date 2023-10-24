const Router = require('express').Router;
const router = new Router();
const bookingsController = require('../controller/controller');

router.get('/bookings', bookingsController.getBookings);
router.post('/bookings', bookingsController.getBookings);

module.exports = router;