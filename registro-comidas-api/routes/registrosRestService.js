var express = require('express');
var router = express.Router();

let registrosService = require('../../registro-comidas-service/registrosService');

router.post('/filter', async function (req, res) {
    let response = await registrosService.getAll(req.body.startDate, req.body.endDate, req.body.valor);
    res.send(response);
})

router.post('/all', async function (req, res) { // routing para POST!
    let r = await registrosService.addRegistries(req.body);
    res.send(r); // los componentes del body se corresponden con los 'name' del html
})

router.post('/', async function (req, res) { // routing para POST!
    let r = await registrosService.createRegistry(req.body)
    res.send(r); // los componentes del body se corresponden con los 'name' del html
})

router.put('/:id', async function (req, res) { // routing para put!
    let r = await registrosService.updateRegistry(req.params.id, req.body)
    res.send(r); // los componentes del body se corresponden con los 'name' del html
})

router.delete('/:id', async function (req, res) { // routing para delete!
    let r = await registrosService.deleteRegistry(req.params.id)
    res.send(r); // los componentes del body se corresponden con los 'name' del html
})

module.exports = router;
