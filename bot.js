const { Telegraf, Markup } = require('telegraf');

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

bot.launch().then(() => {
    console.log('Apex Trading Plan Telegram Bot is running successfully as a Background Worker...');
}).catch((err) => {
    console.error('Error starting bot:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
