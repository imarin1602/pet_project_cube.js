const db = require('../db');


/**
 * DEBAG
 */
class BookingsController {
    async getBookings(request, response) {
        const bookings = await db.query('select * from bookings limit 100');
        return response.json(bookings.rows);
    }
}

module.exports = new BookingsController();