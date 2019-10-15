let registrosDao = require('../registro-comida-dao/registrosDao');

function getAll(start, end) {
    console.log("start:" + start + " end: " + end);
    let all = registrosDao.getAll(start, end)
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