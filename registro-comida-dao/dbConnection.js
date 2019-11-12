const appConfig = require('../app.config');
const mongoose = require('mongoose');

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

module.exports = {
    mongoose
}