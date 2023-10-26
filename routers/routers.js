const Router = require('express').Router;
const router = new Router();
const bookingsController = require('../controller/controller');
const teackets = require('../controller/tickets');
const fligths = require('../controller/flights');
const airports = require('../controller/airports');

router.get('/bookings', bookingsController.getBookings);
router.get('/number-passenger-fligths', teackets.numberPassengerFlights);

//Место для комментария :)
router.get('/fligths', fligths.getStatus);

//Получаем инфо обо всех аэропортах с пагинацией
router.get('/airports', airports.getAirportInfo);
//Получаем общее количество записей об аэропортах
router.get('/airport-total-count', airports.getAirportDataTotalCount);

module.exports = router;