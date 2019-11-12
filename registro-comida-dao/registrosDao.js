const dbConnection = require("./dbConnection");

// database connection
const Schema = dbConnection.mongoose.Schema;

const sRegistries = new Schema({ // creo schema 
    datetime: Date,
    tipo: String,
    valor: String,
    cantidad: Number,
    intensidad: Number,
    tipoEvento: String
});

const cRegistries = 'registries'; // creo la coleccion
const MRegistries = dbConnection.mongoose.model(cRegistries, sRegistries); // creo el modelo

// dao methods
async function getAll(start, end, valor) {
    let query = {
    };
    if (start) {
        query["datetime"] = {
            $gte: start
        }
    }
    if (end) {
        if (query["datetime"]) {
            query["datetime"] = {
                $gte: start,
                $lte: end
            }
        } else {
            query["datetime"] = {
                $lte: end
            }
        }
    }
    if (valor) {
        query["valor"] = {
            $regex: valor, $options: "i"
        }

    }

    return await MRegistries.find(query, (err, registries) => {
        if (err) throw new Error(err);
    }).sort({ datetime: 1 })
}

async function addRegistries(registries) {
    return await registries.forEach(r => {
        let writeRegistry = new MRegistries(r);
        writeRegistry.save((err) => {
            if (err) return console.log("Error en escritura de registro");
        })
    });
}

async function createRegistry(registry) {
    let writeRegistry = new MRegistries(registry);
    return await writeRegistry.save((err) => {
        if (err) return console.log("Error en escritura de registro");
    })
}

async function updateRegistry(registry) {
    return await MRegistries.update({ '_id': registry._id }, registry, function (err, raw) {
        if (err) return handleError(err);
    });
}

async function deleteRegistry(id) {
    return await MRegistries.findByIdAndDelete({ '_id': id }, function (err) {
        if (err) return console.log("Error en escritura de registro");
    })
}

module.exports = {
    getAll,
    addRegistries,
    createRegistry,
    updateRegistry,
    deleteRegistry
}