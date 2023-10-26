const db = require('../db');
/**
 * numberPassengerFlights
 * получаем количество полетов по имени и фамилии
 * в get запросе получаем два пареметра
 * api/number-passenger-fligths?entries=100&page=1
 * entries - количество записей
 * page - номер страницы в пагинаторе
 * 
 */
class Tickets {
    async numberPassengerFlights(request, response) {
        //Получаем из GET параментр entries (количество записей)
        // и приводим к числу
        let entries = parseInt(request.query.entries);

        //Получаем из GET параментр entries (номер страницы в пагинаторе)
        // и приводим к числу
        let pageNumber = parseInt(request.query.page);

        //Проверяем на допустимые значения entries
        //возможные значения в массиве arrayValidValuesOfEntries        
        const arrayValidValuesOfEntries = [50, 100];

        if (!arrayValidValuesOfEntries.includes(entries)) {
            return response.sendStatus(400);
        }


        //Получаем количество всех записей для пагинации
        let rowsLength = await db.query(`
            SELECT passenger_name, COUNT(passenger_name) as count
            FROM tickets
            GROUP BY passenger_name
            HAVING COUNT(passenger_name) > 1
            ORDER BY count desc 
        `);
        // rowsLength = rowsLength.rows[0].count;
        console.log(rowsLength.rowCount/entries)


        // console.log(pageNumber)
        const bookings = await db.query(`
        SELECT passenger_name, COUNT(passenger_name) as count
        FROM tickets
        GROUP BY passenger_name
        HAVING COUNT(passenger_name) > 1
        ORDER BY count desc 
        LIMIT ${entries}
        OFFSET 13
        `);
        // console.log(bookings.rows.length/entries)
        return response.json(bookings.rows);
    }
}

module.exports = new Tickets();