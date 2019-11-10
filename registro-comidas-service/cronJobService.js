const cron = require('node-cron');
var emailService = require('./emailService');

var task = cron.schedule('59 23 * * 0', function () {
    console.log('Running Cron Job');
    emailService.sendEmail();
});

task.start();