
const appConfig = require('../app.config');
const mongoose = require('mongoose');

// database connection
const Schema = mongoose.Schema;

const sRegistries = new Schema({ // creo schema 
    datetime: Date,
    tipo: String,
    valor: String,
    cantidad: Number,
    intensidad: Number,
    tipoEvento: String
});

const cRegistries = 'registries'; // creo la coleccion
const MRegistries = mongoose.model(cRegistries, sRegistries); // creo el modelo
let dbUrl = 'mongodb://' + appConfig.db.host + ':' + appConfig.db.port + '/' + appConfig.db.name;

function connectDB() {
    mongoose.connect(dbUrl,
        { useNewUrlParser: true },
        (err) => {
            if (err) return console.log("Error connecting to the DB");
            console.log("DB connected!");
        });
}

connectDB();

// dao methods
async function getAll(start, end) {
    if (start && end) {
        return await MRegistries.find({ datetime: { $gte: start, $lte: end } }, (err, registries) => {
            if (err) throw new Error(err);
            console.log("===> Consulta todos");
            // registries.forEach(u => {
            //     console.log(u.datetime)
            // })
        }).sort({ datetime: 1 })
    }
    return await MRegistries.find({}, (err, registries) => {
        if (err) throw new Error(err);
        console.log("===> Consulta todos");
        // registries.forEach(u => {
        //     console.log(u.datetime)
        // })
    }).sort({ datetime: 1 })
}

async function addRegistries(registries) {
    // console.log(registries);
    return await registries.forEach(r => {
        let writeRegistry = new MRegistries(r);
        console.log("Insertando registro: ");
        console.log(writeRegistry);
        writeRegistry.save((err) => {
            if (err) return console.log("Error en escritura de registro");
            console.log("Escritura exitosa!");
        })
    });
}

async function createRegistry(registry) {
    let writeRegistry = new MRegistries(registry);
    console.log("Insertando registro: ");
    console.log(writeRegistry);
    return await writeRegistry.save((err) => {
        if (err) return console.log("Error en escritura de registro");
        console.log("Escritura exitosa!");
    })
}

async function updateRegistry(registry) {
    console.log("Actualizando registro: ");
    return await MRegistries.update({ '_id': registry._id }, registry, function (err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
    });
}

async function deleteRegistry(id) {
    console.log("Borrando registro: ");
    return await MRegistries.findByIdAndDelete({ '_id': id }, function (err) {
        if (err) return console.log("Error en escritura de registro");
        console.log("Escritura exitosa!");
    })
}

module.exports = {
    getAll,
    addRegistries,
    createRegistry,
    updateRegistry,
    deleteRegistry
}