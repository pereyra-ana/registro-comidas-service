let registrosDao = require('../registro-comida-dao/registrosDao');
let registroAssembler = require('./assemblers/registro-assembler');

async function getAll(start, end) {
    console.log("start:" + start + " end: " + end);
    let all = await registrosDao.getAll(start, end)
    // console.log(all);
    return all;
}

async function addRegistries(registries) {
    let r = registroAssembler.assemblyRegistry(registries);
    resp = await registrosDao.addRegistries(r);
    return resp;
}

async function createRegistry(registries) {
    // let r = registroAssembler.assemblyRegistry(registries);
    resp = await registries.forEach(r => {
        registrosDao.createRegistry(r);    
    });    
    return resp;
}

async function updateRegistry(registry) {
    // let r = registroAssembler.assemblyRegistry(registries);
    resp = await registrosDao.updateRegistry(registry)
    return resp;
}

async function deleteRegistry(id) {
    // let r = registroAssembler.assemblyRegistry(registries);
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