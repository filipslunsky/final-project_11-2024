const cron = require('node-cron');
const {calculateStreak} = require('./streaksJob.js');

const testCron1 = () => {
    console.log('cron was just here')
};

const testCron2 = async () => {
    console.log('pink fluffy unicorns dancing on rainbows');   
};

cron.schedule('45 23 * * *', testCron1);
cron.schedule('46 * * * *', testCron2);
cron.schedule('18 * * * *', () => {calculateStreak(2)});
cron.schedule('19 * * * *', () => {calculateStreak(2)});
cron.schedule('20 * * * *', () => {calculateStreak(2)});
cron.schedule('21 * * * *', () => {calculateStreak(2)});
cron.schedule('22 * * * *', () => {calculateStreak(2)});