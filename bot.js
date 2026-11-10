const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const TOKEN = process.env.BOT_TOKEN || '9050898568:AAHOzmw3K4dgqaQ9uTwi4rD7lZElhVgUJ_Y';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://apex-trading-plan.onrender.com';

const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
    ctx.reply(
        `Welcome to Apex Forex Academy! 👑\n\nYour institutional SMC & Price Action Trading Plan is ready.\n\n• Risk: 1% Per Trade\n• Target: 1:4 RR\n• Max: 2 Trades / Day`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Open MY TRADING PLAN', WEB_APP_URL)]
        ])
    );
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

// Set webhook route for Telegram
app.use(bot.webhookCallback(`/webhook/${TOKEN}`));
bot.telegram.setWebhook(`${WEB_APP_URL}/webhook/${TOKEN}`);

app.get('/health', (req, res) => {
    res.send('Apex Trading Plan Webhook Server is active!');
});

app.listen(PORT, () => {
    console.log(`Webhook server is running and listening on port ${PORT}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
