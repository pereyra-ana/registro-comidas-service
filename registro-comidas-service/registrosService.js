let registrosDao = require('../registro-comida-dao/registrosDao');
let registroAssembler = require('./assemblers/registro-assembler');

async function getAll(start, end, valor) {
    let all = await registrosDao.getAll(start, end, valor)
    return all;
}

async function addRegistries(registries) {
    let r = registroAssembler.assemblyRegistry(registries);
    resp = await registrosDao.addRegistries(r);
    return resp;
}

async function createRegistry(registries) {
    resp = await registries.forEach(r => {
        registrosDao.createRegistry(r);
    });
    return resp;
}

async function updateRegistry(registry) {
    resp = await registrosDao.updateRegistry(registry)
    return resp;
}

async function deleteRegistry(id) {
    resp = await registrosDao.deleteRegistry(id)
    return resp;
}

module.exports = {
    getAll,
    addRegistries,
    createRegistry,
    updateRegistry,
    deleteRegistry
}