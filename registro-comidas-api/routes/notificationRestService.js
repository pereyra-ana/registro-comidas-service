var express = require('express');
var router = express.Router();

let notificationService = require('../../registro-comidas-service/notificationService');

router.post('/subscribers', function (req, res) {
    let response = notificationService.addPushSubscriber(req);
    res.send(response);
}
)
router.post('/new', async function (req, res) {
    let response = await notificationService.sendNewsletter(req);
    res.send(response);
}
)

module.exports = router;
