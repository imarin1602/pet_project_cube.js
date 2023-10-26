const db = require('../db');

class Fligths {
    async getStatus(request, response) {
        //В GET передаем два ключа 1. статус рейса, 2. код самолета
        //api/fligths?status=Departed&aircraft_code=SU9


        //Получаем массив arrayAircraftCodes всех кодов самолетов 
        //для валидации ключа aircraft_code в get запросе
        //На случай если будут добавлены новые самолеты
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

    async getDelayedByAirport(request, response) {

  
    //Получаем количество задержанных рейсов и время задержки в минутах по каждому аэропорту
    `SELECT EXTRACT(DOW FROM scheduled_departure::timestamp) AS day_of_week,
    EXTRACT(EPOCH FROM (scheduled_departure::timestamp - actual_departure::timestamp)) / 60 AS difference_in_minutes
    FROM flights f 
    WHERE scheduled_departure <> actual_departure
    and departure_airport = 'KZN'
    ORDER BY day_of_week;`

    //Получаем колечество и время задержанных рейсов по дню недели
    `
    SELECT EXTRACT(DOW FROM scheduled_departure::timestamp) AS day_of_week,
       EXTRACT(EPOCH FROM (scheduled_departure::timestamp - actual_departure::timestamp)) / 60 AS difference_in_minutes
        FROM flights f
        WHERE scheduled_departure <> actual_departure
        AND departure_airport = 'KZN'
        AND EXTRACT(DOW FROM scheduled_departure::timestamp) = 1 -- Замените 1 на нужный вам день недели (от 0 до 6)
        ORDER BY day_of_week;
    `
    const arr = ['REN', 'KXK', 'IKT', 'TBW', 'AER', 'NBC',
      'KRR', 'PKC', 'EGO', 'NYA', 'KLF', 'VKT', 'GOJ', 'GRV', 'RTW', 'URS', 'YKS',
      'UUS', 'VOG', 'LED', 'OGZ', 'SLY', 'NJC', 'UKX', 'MCX', 'KUF', 'CEE', 'OSW', 'UIK',
      'UUD', 'MQF', 'KJA', 'KGD', 'BZK', 'CNN', 'IAR', 'KZN', 'SVX', 'USK', 'ABA',
      'BQS', 'UUA', 'PEZ', 'SWT', 'MJZ', 'MMK', 'KVX', 'ULY', 'DME', 'MRV', 'ARH',
      'RGK', 'PEE', 'PYJ', 'BTK', 'CSY', 'GDZ', 'KRO', 'EYK', 'OMS', 'ROV', 'UCT',
      'VOZ', 'PES', 'ULV', 'DYR', 'KYZ', 'SCW', 'VKO', 'URJ', 'LPK', 'BAX', 'KEJ',
      'ASF', 'VVO', 'KHV', 'NUX', 'TOF', 'NNM', 'NFG', 'AAQ', 'OVB', 'NYM', 'STW',
      'TJM', 'KGP', 'GDX', 'OVS', 'UFA', 'SVO', 'IJK', 'HTA', 'IWA', 'NOJ', 'JOK',
      'SKX', 'HMA', 'NOZ', 'NAL', 'ESL', 'NSK', 'SGC', 'PKV', 'CEK']

    }
    async getDelayedByAirportAndDay(request, response) {
            //Получаем колечество и время задержанных рейсов по дню недели
    `
    SELECT EXTRACT(DOW FROM scheduled_departure::timestamp) AS day_of_week,
       EXTRACT(EPOCH FROM (scheduled_departure::timestamp - actual_departure::timestamp)) / 60 AS difference_in_minutes
        FROM flights f
        WHERE scheduled_departure <> actual_departure
        AND departure_airport = 'KZN'
        AND EXTRACT(DOW FROM scheduled_departure::timestamp) = 1 -- Замените 1 на нужный вам день недели (от 0 до 6)
        ORDER BY day_of_week;
    `
    }
}
module.exports = new Fligths();