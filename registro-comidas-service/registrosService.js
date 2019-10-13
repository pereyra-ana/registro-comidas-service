let registrosDao = require('../registro-comida-dao/registrosDao');

function getAll() {
    let all = registrosDao.getAll()
    console.log(all);
    return all;
}

function addRegistries(registries) {
    registrosDao.addRegistries(registries);
}

module.exports = {
    getAll,
    addRegistries
}