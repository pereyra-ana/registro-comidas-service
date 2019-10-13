const express = require('express');
const mongoose = require('mongoose');	
const bodyParser = require('body-parser');
const app = express();
const appConfig = require('./app.config');

// database connection
let dbUrl = 'mongodb://' + appConfig.db.host + ':' + appConfig.db.port + '/' + appConfig.db.name;

mongoose.connect(dbUrl, // protocolo 'mongodb' que usa mongoose para conectarse a la base (como el protocolo ftp); me conecto por puerto default (28017)
	{ useNewUrlParser: true},
	(err) => {
		if (err) return console.log("Error en conexion de la base de datos");
		console.log("Base de datos conectada!");

		// si al crear un documento la coleccion no existe, mongoose la crea automaticamente
		// CREACION DE DOCUMENTO
		/*let usuario = {
			nombre : "Jose",
			edad : 15
		}
		let writeUsuario = new MUsuarios(usuario);
		writeUsuario.save((err) => {
			if (err) return console.log("Error en escritura de usuario");
			console.log("Escritura exitosa!");
		})*/

		// CONSULTA
		// MUsuarios.find({}, (err, usuarios) => {
		// 	if (err) return console.log("Error en lectura de usuario");
		// 	console.log("===> Consulta todos");
		// 	usuarios.forEach(u => {
		// 		console.log(u)
		// 	})
		// })

		// CONSULTA CON FILTRO GT
		// MUsuarios.find({edad: {$gt: 40}}, (err, usuarios) => {
		// 	if (err) return console.log("Error en lectura de usuario");
		// 	console.log("===> Consulta filtro edad");
		// 	usuarios.forEach(u => {
		// 		console.log(u)
		// 	})
		// })

		// CONSULTA CON FILTRO OR
		// MUsuarios.find({$or: [{nombre: 'Ana'}, {nombre: 'Jose'}]}, (err, usuarios) => {
		// 	if (err) return console.log("Error en lectura de usuario");
		// 	console.log("===> Consulta OR");
		// 	usuarios.forEach(u => {
		// 		console.log(u)
		// 	})
		// })

		// CONSULTA CON FILTRO AND
		// MUsuarios.find({nombre: 'Ana', edad: 28}, (err, usuarios) => {
		// 	if (err) return console.log("Error en lectura de usuario");
		// 	console.log("===> Consulta AND");
		// 	usuarios.forEach(u => {
		// 		console.log(u)
		// 	})
		// })

		// ACTUALIZO REGISTRO
		// MUsuarios.update({ nombre: 'Ana' }, {edad : 29}, function (err, raw) {
  		// 	if (err) return handleError(err);
  		// 	console.log('The raw response from Mongo was ', raw);
		// });
	});


const port = process.env.app_port || 3000;

let contador = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

var registriesApi = require('./registro-comidas-api/routes/registrosRestService');
app.use('/registries', registriesApi);

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
