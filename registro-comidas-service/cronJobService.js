const cron = require('node-cron');
const emailService = require('./emailService');
const config = require('../app.config')

var task = cron.schedule(config.cron.frequency, function () {
    console.log('Running Cron Job');
    emailService.sendEmail();
});

task.start();