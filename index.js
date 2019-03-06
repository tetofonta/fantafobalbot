const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const {Pool} = require('pg');
const telegraf = require("telegraf");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const bot = new telegraf(process.env.TELEGRAM_TOKEN);

bot.on('text', ({ reply }) => reply('Fottiti coglione, vieni tu al mio posto a lavorare 😒'));

bot.telegram.setWebhook('https://mysterious-island-36950.herokuapp.com/secret-path');

express()
    .use(bot.webhookCallback('/secret-path'))
    .get('/db', async (req, res) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM test_table');
            const results = {'results': (result) ? result.rows : null};
            res.send(results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
