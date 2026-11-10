const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const TOKEN = process.env.BOT_TOKEN || '9050898568:AAHOzmw3K4dgqaQ9uTwi4rD7lZElhVgUJ_Y';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://apex-trading-plan.onrender.com';

const bot = new Telegraf(TOKEN);

// Telegram /start command setup
bot.start((ctx) => {
    ctx.reply(
        `Welcome to Apex Forex Academy! 👑\n\nYour institutional SMC & Price Action Trading Plan is ready.\n\n• Risk: 1% Per Trade\n• Target: 1:4 RR\n• Max: 2 Trades / Day`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Open MY TRADING PLAN', WEB_APP_URL)]
        ])
    );
});

// Express server create gochuu (Render port binding error akka hin fidineef)
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

app.get('/health', (req, res) => {
    res.send('Apex Trading Plan Web Service & Bot is active!');
});

app.listen(PORT, () => {
    console.log(`Web Service is running and listening on port ${PORT}`);
});

// Launch Telegram Bot (Long polling)
bot.launch().then(() => {
    console.log('Apex Trading Plan Telegram Bot is running successfully...');
}).catch((err) => {
    console.error('Error starting bot:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
