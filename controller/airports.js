const db = require('../db');

class AirportController {
    /**
     * Получаем инфо обо всех аэропортах с пагинацией
     * @param {Number} entries
     * @param {Number} page
     * @returns 
     */
    async getAirportInfo(request, response) {
        //Получаем из GET параментр entries (количество записей)
        // и приводим к числу
        let entries = parseInt(request.query.entries);

        //Получаем из GET параментр entries (номер страницы в пагинаторе)
        // и приводим к числу
        let pageNumber = parseInt(request.query.page);

        //Проверяем на допустимые значения entries
        //возможные значения в массиве arrayValidValuesOfEntries        
        const arrayValidValuesOfEntries = [20, 50];

        if (!arrayValidValuesOfEntries.includes(entries)) {
            return response.sendStatus(400);
        }


        
        //Проверяем на доупстимые значения page
        //Получаем количество всех записей для пагинации
        let rowsLength = await db.query(`
            SELECT DISTINCT airport_code, airport_name, city
            FROM airports_data;
        `);
        rowsLength = rowsLength.rows[0].count;

        if (pageNumber <=0) {
            return response.sendStatus(400);
        }
  

        const airportsInfo = await db.query(`
        SELECT DISTINCT airport_code, airport_name, city
        FROM airports_data
        ORDER BY airport_code ASC
        LIMIT ${entries}
        OFFSET ${entries * (pageNumber - 1)};
        `);
        return response.json(airportsInfo.rows);
    }

    /**
     * Получаем общее количество записей об аэропортах
     * @returns Number
     */
    async getAirportDataTotalCount(request, response) {
        let totalCount = await db.query(`
            SELECT DISTINCT airport_code, airport_name, city
            FROM airports_data;
        `);
        totalCount = parseInt(totalCount.rowCount);
        return response.json(totalCount);
    }
}

module.exports = new AirportController();