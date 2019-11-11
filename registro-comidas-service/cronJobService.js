const cron = require('node-cron');
var emailService = require('./emailService');

var task = cron.schedule('59 2 * * 1', function () {
    console.log('Running Cron Job');
    emailService.sendEmail();
});

task.start();