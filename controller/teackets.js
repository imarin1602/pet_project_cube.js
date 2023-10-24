const db = require('../db');

/**
 * Получаем 100 человек с самым большим количеством полетов
 */
class Teackets {
    async numberPassengerFlights(request, response) {
        const bookings = await db.query(`
        SELECT passenger_name, COUNT(passenger_name) as count
        FROM tickets
        GROUP BY passenger_name
        HAVING COUNT(passenger_name) > 1
        ORDER BY count desc 
        limit 10;
        `);
        return response.json(bookings.rows);
    }
}

module.exports = new Teackets();