const rateLimiter = require('express-rate-limit');

// ограничиваем общее количество запросов с одного IP - 600 в час
const apiRequestLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 600,
  message: `С вашего IP-адреса поступило слишком много запросов!
    Повторите Ваш запрос через 15 минут!`
})

// лимит на создание новых аккаунтов с одного IP - 15 в час
const createNewAccountRequestLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: `С Вашего IP-адреса поступило слишком много запросов,
    на регистрацию нового пользователя! Попробуйте еще раз через 1 час. `,
})

module.exports = { apiRequestLimiter, createNewAccountRequestLimiter };
