var express = require('express');
var router = express.Router();

let chartsService = require('../../registro-comidas-service/chartsService');

router.post('/data', async function (req, res) {
    let response = await chartsService.getData(req.body.startDate, req.body.endDate, req.body.chartType);
    res.send(response);
}
)

module.exports = router;
