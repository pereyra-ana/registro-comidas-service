const inMemoryDB = require('./in-memory-db');
const webpush = require('web-push');

const USER_SUBSCRIPTIONS = inMemoryDB.USER_SUBSCRIPTIONS;

const vapidKeys = {
    "publicKey": "BOZDvy80tL4MTo8EB3bSnswaNunGK4IsqpvSW5XnsrwzHVrPAQOKPnDentbyny5caBDCdflIXWiUZT-uwm-HHZM",
    "privateKey": "wJ9aOjK5hU25NlQaMaFXRx33QIIGaWPa9fWu9-9R1Qk"
};

webpush.setVapidDetails(
    'mailto:foodregistry.info@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

function addPushSubscriber(req) {
    const sub = req.body;
    console.log('Received Subscription on the server: ', sub);
    USER_SUBSCRIPTIONS.push(sub);
    return;
};

async function sendNewsletter(req) {
    console.log("start send news")
    const allSubscriptions = USER_SUBSCRIPTIONS;

    if (allSubscriptions.length > 0) {
        console.log('Total subscriptions', allSubscriptions.length);
        const notificationPayload = {
            "notification": {
                "title": "Food Registry",
                "body": "Hace dos horas fue tu última comida. Come algo!",
                "icon": "assets/logoFR.png",
                "vibrate": [100, 50, 100],
                "data": {
                    "dateOfArrival": Date.now(),
                    "primaryKey": 1
                },
                "actions": [{
                    "action": "explore",
                    "title": "Aceptar"
                }]
            }
        };

        console.log("sending new notif")

        try {
            await Promise.all(allSubscriptions.map(e => {
                webpush.sendNotification(e.sub, JSON.stringify(notificationPayload))
            }));
            return console.log("Notification sent okay");
        }
        catch (err) {
            console.error("Error sending notification, reason: ", err);
        }
    } else {
        console.log("No subscriptions");
    }

}

module.exports = {
    addPushSubscriber,
    sendNewsletter
}
