const cron = require('node-cron');
const emailService = require('./emailService');
const notifService = require('./notificationService');
const registryService = require('./registrosService');
const config = require('../app.config')

var taskEmail = cron.schedule(config.cron.emailFrequency, function () {
    console.log('Running Cron Email Job');
    emailService.sendEmail();
});

var taskNotification = cron.schedule(config.cron.notificationFrequency, async function () {
    console.log('Running Cron Notif Job');
    var now = new Date();
    // if (11 < now.getHours() && now.getHours() < 23) {
    let beginningOfToday = new Date();
    beginningOfToday.setHours(0);
    beginningOfToday.setMinutes(0);
    beginningOfToday.setSeconds(0);
    beginningOfToday.setMilliseconds(0)

    let rs = await registryService.getAll(beginningOfToday, now, null);

    let lastFood = null;

    if (rs.length > 0) {
        for (let index = rs.length - 1; index < rs.length; index--) {
            const element = rs[index];
            if (element.tipo === 'comida') {
                lastFood = element;
                break;
            }
        }

        if (lastFood) {
            if (new Date().getHours() - lastFood.datetime.getHours() > 2) {
                console.log("Remind user to eat!")
                notifService.sendNewsletter();
            } else {
                console.log("Food has been eaten in the last two hours");
            }
        } else {
            console.log("No food eaten today");
            notifService.sendNewsletter();
        }
    }

    // }
});

taskEmail.start();
taskNotification.start();