var express = require('express');
var router = express.Router();

let emailService = require('../../registro-comidas-service/registro-comidas-service/emailService');

router.get('/email', function (req, res) {
    let response = emailService.sendEmail();
    res.send(response);
}
);

module.exports = router;
