
const appConfig = require('../app.config');
const mongoose = require('mongoose');

// database connection
const Schema = mongoose.Schema;

const sRegistries = new Schema({ // creo schema 
    datetime: Date,
    tipo: String,
    valor: String,
    cantidad: Number,
    intensidad: Number
});

const cRegistries = 'registries'; // creo la coleccion

const MRegistries = mongoose.model(cRegistries, sRegistries); // creo el modelo

let dbUrl = 'mongodb://' + appConfig.db.host + ':' + appConfig.db.port + '/' + appConfig.db.name;

function connectDB() {
    mongoose.connect(dbUrl, // protocolo 'mongodb' que usa mongoose para conectarse a la base (como el protocolo ftp); me conecto por puerto default (28017)
        { useNewUrlParser: true },
        (err) => {
            if (err) return console.log("Error en conexion de la base de datos");
            console.log("Base de datos conectada!");

            // si al crear un documento la coleccion no existe, mongoose la crea automaticamente
            // CREACION DE DOCUMENTO
            let r = {
                "datetime": "2019-10-10T09:58:18-0300",
                tipo: "comida",
                valor: "banana",
                cantidad: 1,
                intensidad: null
            }
            // let writeRegistry = new MRegistries(r);
            // writeRegistry.save((err) => {
            //     if (err) return console.log("Error en escritura de usuario");
            //     console.log("Escritura exitosa!");
            // })

            // MRegistries.find({}, (err, registries) => {
            // 	if (err) return console.log("Error en lectura de usuario");
            // 	console.log("===> Consulta todos");
            // 	registries.forEach(u => {
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
}

connectDB();

let data = [
    {
        // "datetime": "2019-10-15T01:22:42.136Z",
        "datetime": "2019-10-10T09:58:18-0300",
        "tipo": "Comida",
        "valor": "Banana",
        "cantidad": 1
    },
    {
        "datetime": "2019-10-10T08:15:27-0300",
        "tipo": "Síntoma",
        "valor": "Dolor de estómago",
        "intensidad": 2
    },
    {
        "datetime": "2019-10-09T15:00:32-0300",
        "tipo": "Comida",
        "valor": "Banana",
        "cantidad": 1
    },
    {
        "datetime": "2019-10-09T11:19:11-0300",
        "tipo": "Síntoma",
        "valor": "Dolor de estómago",
        "intensidad": 2
    },
    {
        "datetime": "2019-10-09T08:30:20-0300",
        "tipo": "Comida",
        "valor": "Banana",
        "cantidad": 1
    },
    {
        "datetime": "2019-10-07T15:34:20-0300",
        "tipo": "Síntoma",
        "valor": "Dolor de estómago",
        "intensidad": 2
    },
    {
        "datetime": "2019-10-06T14:20:49-0300",
        "tipo": "Misceláneo",
        "valor": "Zumba"
    },
];

function getAll(start, end) {
    MRegistries.find({ datetime : {$gt: start} }, (err, registries) => {
        if (err) return console.log("Error en lectura de usuario");
        console.log("===> Consulta todos");
        registries.forEach(u => {
            console.log(u)
        })
    })
    return data.filter(d => Date.parse(start) <= Date.parse(d.datetime) && Date.parse(d.datetime) <= Date.parse(end));
}

function addRegistries(registries) {
    console.log(registries);
    // registries.array.forEach(r => {
        let writeRegistry = new MRegistries(registries);
        writeRegistry.save((err) => {
            if (err) return console.log("Error en escritura de usuario");
            console.log("Escritura exitosa!");
        })
    // });
}

module.exports = {
    getAll,
    addRegistries
}