const telegraf = require('telegraf');
const fastify = require('fastify')();

const bot = new telegraf(process.env.TELEGRAM_TOKEN);
const port = process.env.PORT || 5000;

bot.on('text', ({ reply }) => reply('Hello'));


fastify.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook('https://mysterious-island-36950.herokuapp.com/secret-path');

fastify.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});