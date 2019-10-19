let chartAssembler = require('./assemblers/chart-assembler');
let registroService = require('../registro-comidas-service/registrosService');

async function getData(start, end, chartType) {
    console.log("Getting data for chart " + chartType + " - start:" + start + " end: " + end);
    let all = await registroService.getAll(start, end);
    // console.log(all);
    let result = chartAssembler.getDataForChartType(chartType, all);
    return result;
}

module.exports = {
    getData,
}