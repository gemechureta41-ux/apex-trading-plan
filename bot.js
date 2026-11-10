const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const TOKEN = process.env.BOT_TOKEN || '9050898568:AAHOzmw3K4dgqaQ9uTwi4rD7lZElhVgUJ_Y';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://apex-trading-plan.onrender.com';

const bot = new Telegraf(TOKEN);

// Professional & Elite Execution Command with Rich Emojis
bot.start((ctx) => {
    ctx.reply(
        `💎 *APEX FOREX ACADEMY — INSTITUTIONAL TERMINAL* ⚡\n\n` +
        `Welcome to your elite SMC & Price Action command center. All systems are fully synchronized and secure. 🛡️📈\n\n` +
        `Click the button below to open your forex trading plan and execute with absolute discipline. 🔥🎯`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.webApp('🚀 LAUNCH TRADING PLAN ✨', WEB_APP_URL)]
            ])
        }
    );
});

// Express server configuration (Render Web Service & Webhook)
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

// Set webhook route for Telegram to avoid 409 conflict
app.use(bot.webhookCallback(`/webhook/${TOKEN}`));
bot.telegram.setWebhook(`${WEB_APP_URL}/webhook/${TOKEN}`);

app.get('/health', (req, res) => {
    res.send('Apex Trading Plan Webhook Server & Bot is active and healthy!');
});

app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
