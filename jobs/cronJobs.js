const cron = require('node-cron');
const {
    timeCheckStreaksByFrequency,
} = require('./streaksJob.js');

cron.schedule('0 0 * * *', () => {timeCheckStreaksByFrequency('daily')});
cron.schedule('0 0 * * 0', () => {timeCheckStreaksByFrequency('weekly')});
