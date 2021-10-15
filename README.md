## Дипломный проект Яндекс Практикум - BackEnd

## Директории
`/routes` — папка с файлами роутера
`/controllers` — папка с файлами контроллеров пользователя и карточки
`/models` — папка с файлами описания схем пользователя и карточки
`/middleware` - папка с мидлеврами, используемыми в проекте
`/errors` - папка с шаблонами ошибок в приложении
`/utils` - папка с вспомогательными методам, схемами валидации и регулярными выражениями

## Запуск проекта
`npm run start` — запускает сервер

`npm run dev` — запускает сервер с hot-reload

`npm run lint` - проверка кода ESLint


## Основные технологии
### Приложение
- бэкэнд построен на [Node.js](https://nodejs.org/en/) на фреймворке [`Express`](http://expressjs.com/)
- Hot-reload реализован через 'nodemon'
- база данных [`MongoDB`](https://www.mongodb.com/), подключена к JS через [`Mongoose`](https://mongoosejs.com/)
- аутентификация и авторизация пользователя через [`bcrypt`](https://www.npmjs.com/package/bcryptjs)
- мидлевры для авторизации пользователя
- защита роутов авторизацией
- создание и настройка токенов авторизованных пользователей [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken)
- мидлевер для централизованной обработки ошибок
- использованы регулярные выражения для схем валидации
- ограничение по количеству запросов через [`Express-rate-limit`](https://www.npmjs.com/package/express-rate-limit)
- предварительная валидация данных и схемы валидации построены на [`Celebrate`](https://www.npmjs.com/package/celebrate#celebrateschema-joioptions-opts) и 'Joi'

### Безопасность
- защита от DDoS-атак через валидацию запросов приходящих на сервер ('celebrate' и 'Joi')
- защита от множественных запросов с одного IP (express-rae-limit)
- защита от межсайтового скрипта (XSS)
- хранение токенов в Cookie, защита от CSRF атак
- проведена проверка безопасности зависимостей через "npm audit"

### Server
- OC `Ubuntu`
- Виртуальная Машина на [`Яндекс.Облако`](https://cloud.yandex.ru)
- База Данных на MongoDB
- Обновления с репозитория [`Git-Movie-Explorer-API`](https://github.com/Michael2M-dot/movies-explorer-api)
- Менеджер процессов на [`Pm2`](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- Обратный прокси-сервер на [`Nginx`](https://nginx.org/ru/)
- Бэкенд принимает запросы на [`поддомене`](https://api.my-movie.nomoredomains.club)
- Обмен информации по протоколу HTTPS


### Планы по доработке проекта
- согласно заданию следующих этапов

### Готовый проект расположен: [`Movie-Explorer-API`](https://my-movie.nomoredomains.monster)
