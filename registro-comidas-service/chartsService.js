let chartAssembler = require('./assemblers/chart-assembler');
let registroService = require('../registro-comidas-service/registrosService');

async function getData(start, end, chartType) {
    let all = await registroService.getAll(start, end);
    let result = await chartAssembler.getDataForChartType(chartType, all);
    return result;
}

module.exports = {
    getData,
}