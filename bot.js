const { Telegraf, Markup } = require('telegraf');

// BotFather token kee asitti galchi
const TOKEN = process.env.BOT_TOKEN || '9050898568:AAHOzmw3K4dgqaQ9uTwi4rD7lZElhVgUJ_Y';
const bot = new Telegraf(TOKEN);

// URL Web App Render irratti host goote asitti kaa'i (Fakkeenyaaf: https://my-trading-plan.onrender.com)
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://my-trading-plan.onrender.com';

bot.start((ctx) => {
    ctx.reply(
        `Welcome to Apex Forex Academy! 👑\n\nYour institutional SMC & Price Action Trading Plan is ready.\n\n• Risk: 1% Per Trade\n• Target: 1:4 RR\n• Max: 2 Trades / Day`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Open MY TRADING PLAN', WEB_APP_URL)]
        ])
    );
});

bot.launch();
console.log('Apex Trading Plan Bot is running successfully...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
