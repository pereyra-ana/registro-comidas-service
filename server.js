const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cron = require('./registro-comidas-service/cronJobService');

const port = process.env.app_port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})
// fin app headers

// ROUTING
var registriesApi = require('./registro-comidas-api/routes/registrosRestService');
app.use('/registries', registriesApi);

var chartsApi = require('./registro-comidas-api/routes/chartsRestService');
app.use('/charts', chartsApi);

var testApi = require('./registro-comidas-api/testRest');
app.use('/test', testApi);

app.get('/*', function (req, res) { // cuando no encuentra ninguna ruta que coincida, cae en esta
    res.send('Mmm... What are you looking for?');
})
// FIN ROUTING

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log("Express Server listening at port: " + port);
});
