const db = require('../db');

class BookingsController {
    async getBookings(request, response) {
        const bookings = await db.query('select * from bookings');
        return response.json(bookings);
    }
}

module.exports = new BookingsController();