const dbConnection = require("./dbConnection");

// database connection
const Schema = dbConnection.mongoose.Schema;

const sTypes = new Schema({ // creo schema 
    valor: String,
    alimentos: []
});

const cTypes = 'food_types'; // creo la coleccion
const MTypes = dbConnection.mongoose.model(cTypes, sTypes); // creo el modelo

// dao methods
async function getAll() {
    return await MTypes.find({}, (err, types) => {
        if (err) throw new Error(err);
    })
}

module.exports = {
    getAll,
}