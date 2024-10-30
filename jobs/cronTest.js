const cron = require('node-cron');

const testCron1 = () => {
    console.log('cron was just here')
};

const testCron2 = async () => {
    console.log('pink fluffy unicorns dancing on rainbows');   
};

cron.schedule('45 23 * * *', testCron1);
cron.schedule('46 * * * *', testCron2);