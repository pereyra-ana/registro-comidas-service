function getDataForChartType(chartType, data) {
    let dataForChart = {};

    switch (chartType) {
        case 'alimentosVsTotal':
            dataForChart["labels"] = [];
            dataForChart["amounts"] = [];
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                const e = data[i];

                if (e.tipo && (e.tipo.toLowerCase() === 'comida' || e.tipo.toLowerCase() === 'bebida')) {
                    let index = dataForChart["labels"].indexOf(e.valor);
                    if (index === -1) {
                        dataForChart["labels"].push(e.valor);
                        if (e.cantidad != null && e.cantidad != undefined) {
                            dataForChart["amounts"].push(e.cantidad);
                        } else {
                            dataForChart["amounts"].push(1);
                        }
                    } else {
                        if (e.cantidad != null && e.cantidad != undefined) {
                            dataForChart["amounts"][index] = dataForChart["amounts"][index] + e.cantidad;
                        } else {
                            dataForChart["amounts"][index] = dataForChart["amounts"][index] + 1;
                        }
                    }
                }
            }
            break;
        case 'tipoAlimentoVsTotal':
            break;
        default:
            break
    }
    return dataForChart;
}

module.exports = {
    getDataForChartType
}

