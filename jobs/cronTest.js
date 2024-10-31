const cron = require('node-cron');
const {continueStreak} = require('./streaksJob.js');

const testCron1 = () => {
    console.log('cron was just here')
};

const testCron2 = async () => {
    console.log('pink fluffy unicorns dancing on rainbows');   
};

cron.schedule('45 * * * *', testCron1);
cron.schedule('46 * * * *', testCron2);
cron.schedule('13 * * * *', () => {continueStreak(2)});
cron.schedule('14 * * * *', () => {continueStreak(2)});

