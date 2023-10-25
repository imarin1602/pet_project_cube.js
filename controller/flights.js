const db = require('../db');

class Fligths {
    async getStatus(request, response) {
        //В GET передаем два ключа 1. статус рейса, 2. код рейса
        //api/fligths?status=Departed&aircraft_code=SU9


        //Получаем массив arrayAircraftCodes всех кодов рейса 
        //для валидации ключа aircraft_code в get запросе
        //На случай если будут добавлены новые рейсы
        //Пока так ['CN1', 'CR2', '773', '763', '319', '733', '321', 'SU9']
        const aircraft_code = await db.query(`
            SELECT DISTINCT aircraft_code
            FROM flights;
        `);
        let arrayAircraftCodes = aircraft_code.rows.map(a => a.aircraft_code);
    
        //Массив arrayStatus со всеми возможными статусами рейса
        const arrayStatus = [
            'Scheduled', // Рейс доступен для бронирования. Это происходит за месяц до плановой даты вылета; до этого запись о рейсе не существует в базе данных.
            'On Time', // Рейс доступен для регистрации (за сутки до плановой даты вылета) и не задержан.
            'Delayed', // Рейс доступен для регистрации (за сутки до плановой даты вылета), но задержан.
            'Departed', // Самолет уже вылетел и находится в воздухе.
            'Arrived', // Самолет прибыл в пункт назначения.
            'Cancelled' // Рейс отменён.
        ]

        //Получаем переменные из query GET запроса
        const statusFromQuery = request.query.status;
        const aircraftCodeFromQuery = request.query.aircraft_code;

        //Провереем корректность переменных из запроса
        //если неправильные возвращаем 400
        if (
            !arrayStatus.includes(statusFromQuery) 
            ||
            !arrayAircraftCodes.includes(aircraftCodeFromQuery)
            )
        {
            return response.sendStatus(400);
        } 
        else
        {
            const result = await db.query(`
                SELECT *
                FROM flights f 
                WHERE status = '${statusFromQuery}'
                AND aircraft_code = '${aircraftCodeFromQuery}';
            `);
            return response.json(result.rows);
        }
    }

}

module.exports = new Fligths();