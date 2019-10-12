const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = process.env.app_port || 3000;

let contador = 0;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})

// ROUTING 
app.get('/', function (req, res) { // configuracion del routing del express
    res.send(`Soy una aplicacion node + express <br> Cantidad de visitas: ${contador}`);
    contador++;
})

app.get('/main', function (req, res) {
    res.send('Main says: hello world! :)');
})

app.get('/registries', function (req, res) {
    let response = [
        {
            "datetime": new Date(),
            "tipo": "Comida",
            "valor": "Banana",
            "cantidad": 1
        },
        {
            "datetime": new Date(),
            "tipo": "Síntoma",
            "valor": "Dolor de estómago",
            "intensidad": 2
        }
    ]
    res.send(response);
}
)

app.post('/registries', urlencodedParser, function (req, res) { // routing para POST!
  console.log(req.body); // para parsear se utiliza la libreria body-parser -> genera el tag body
  res.send(); // los componentes del body se corresponden con los 'name' del html
})

// app.get('/form', function (req, res) { // routing con archivo de vista
//   res.sendFile(__dirname + '/views/index.html');
// })

// app.post('/datos', urlencodedParser, function (req, res) { // routing para POST!
//   console.log(req.body); // para parsear se utiliza la libreria body-parser -> genera el tag body
//   res.send(`Datos recibidos POST: <br> Nombre -> ${req.body.nombre} <br> Edad -> ${req.body.edad}`); // los componentes del body se corresponden con los 'name' del html
// })

// app.get('/datos', urlencodedParser, function (req, res) {
//   console.log(req.query); // para parsear se utiliza la libreria body-parser -> genera el tag query
//   let {nombre, edad} = req.query; // Patron REST! :p 
//   res.send(`Datos recibidos GET: <br> Nombre -> ${nombre} <br> Edad -> ${edad}`); // los componentes del body se corresponden con los 'name' del html
// })


app.get('/*', function (req, res) { // cuando no encuentra ninguna ruta que coincida, cae en esta
    res.send('Mmm... What are you looking for?');
})
// FIN ROUTING

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log("Servidor Express escuchando en el puerto: " + port);
});
