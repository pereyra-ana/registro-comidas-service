let registrosDao = require('../registro-comida-dao/registrosDao');
let registroAssembler = require('./assemblers/registro-assembler');

async function getAll(start, end) {
    console.log("start:" + start + " end: " + end);
    let all = await registrosDao.getAll(start, end)
    console.log(all);
    return all;
}

async function addRegistries(registries) {
    let r = registroAssembler.assemblyRegistry(registries);
    resp = await registrosDao.addRegistries(r);
    return resp;
}

module.exports = {
    getAll,
    addRegistries
}