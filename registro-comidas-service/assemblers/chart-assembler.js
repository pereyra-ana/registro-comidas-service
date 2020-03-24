const tiposDAO = require('../../registro-comida-dao/tipoAlimentoDAO');

function getWeekOfTheYear(date) {
    var d = new Date(+date);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
}

async function getDataForChartType(chartType, data) {
    let dataForChart = {};

    if (chartType === 'alimentosVsTotal') {
        dataForChart["labels"] = [];
        dataForChart["amounts"] = [];

        for (let i = 0; i < data.length; i++) {
            const e = data[i];

            if (e.tipo && (e.tipo.toLowerCase() === 'comida' || e.tipo.toLowerCase() === 'bebida')) {
                let index = dataForChart["labels"].indexOf(e.valor);
                if (index === -1) {
                    dataForChart["labels"].push(e.valor);
                    dataForChart["amounts"].push(1);
                } else {
                    dataForChart["amounts"][index] = dataForChart["amounts"][index] + 1;
                }
            }
        }
        return dataForChart;
    }
    else if (chartType === 'tiposAlimentosVsTotal') {
        let hashResultados = {};
        let otrosLabel = ["OTROS:"];
        let hashValues = {};

        let dataFood = data.filter(d => d.tipo === "comida" || d.tipo === "bebida")

        let types = await tiposDAO.getAll();
        let tiposAlimentos = {};
        types.forEach(u => {
            tiposAlimentos[u.valor] = u.alimentos
        });

        for (let i = 0; i < dataFood.length; i++) {
            const registro = dataFood[i];
            let alimentoPermitidoInRegistro = false;
            for (let tipoAlimento in tiposAlimentos) {
                for (let j = 0; j < tiposAlimentos[tipoAlimento].length; j++) {
                    const alimento = tiposAlimentos[tipoAlimento][j];

                    if (isValueInList(alimento, registro, tiposAlimentos) &&
                        registro.valor.toLowerCase().indexOf("frito") == (-1) &&
                        registro.valor.toLowerCase().indexOf("frita") == (-1) &&
                        !(tipoAlimento in hashResultados)) {
                        hashResultados[tipoAlimento] = 1;
                        alimentoPermitidoInRegistro = true;

                        if (!(tipoAlimento in hashValues)) {
                            hashValues[tipoAlimento] = [registro.valor.toLowerCase()]
                        } else {
                            if (hashValues[tipoAlimento].indexOf(registro.valor.toLowerCase()) == (-1))
                                hashValues[tipoAlimento].push(registro.valor.toLowerCase());
                        }

                    } else if (isValueInList(alimento, registro, tiposAlimentos) &&
                        registro.valor.toLowerCase().indexOf("frito") == (-1) &&
                        registro.valor.toLowerCase().indexOf("frita") == (-1) &&
                        (tipoAlimento in hashResultados)) {
                        hashResultados[tipoAlimento] = hashResultados[tipoAlimento] + 1;
                        alimentoPermitidoInRegistro = true

                        if (!(tipoAlimento in hashValues)) {
                            hashValues[tipoAlimento] = [registro.valor.toLowerCase()]
                        } else {
                            if (hashValues[tipoAlimento].indexOf(registro.valor.toLowerCase()) == (-1))
                                hashValues[tipoAlimento].push(registro.valor.toLowerCase());
                        }
                    }
                }
            }
            if (!alimentoPermitidoInRegistro) {
                let aux = "OTROS" in hashResultados;
                let aux2 = "OTROS" in hashValues;

                if (!aux) {
                    hashResultados["OTROS"] = 1;
                    otrosLabel.push(registro.valor);
                } else {
                    hashResultados["OTROS"] = hashResultados["OTROS"] + 1;
                }

                if (!aux2) {
                    hashValues["OTROS"] = [registro.valor]
                } else {
                    if (hashValues["OTROS"].indexOf(registro.valor) == (-1))
                        hashValues["OTROS"].push(registro.valor);
                }
            }
        }

        dataForChart["labels"] = Object.keys(hashResultados);
        dataForChart["amounts"] = Object.values(hashResultados);
        dataForChart["values"] = hashValues;
        return dataForChart;
    }
    else if (chartType === 'permitidosVsNo') {
        let barChartLabels = [];
        let barChartData = [
            { data: [], label: 'Permitidos' },
            { data: [], label: 'No Permitidos' }
        ];

        let dataFood2 = data.filter(d => d.tipo === "comida" || d.tipo === "bebida")

        let types = await tiposDAO.getAll();
        let tiposAlimentos = {};
        types.forEach(u => {
            tiposAlimentos[u.valor] = u.alimentos
        });

        for (let i = 0; i < dataFood2.length; i++) {
            const registro = dataFood2[i];

            let week = getWeekOfTheYear(registro.datetime);
            let indexLabel = barChartLabels.indexOf("Semana " + week);
            if (indexLabel == -1) {
                barChartLabels.push("Semana " + week);
                indexLabel = barChartLabels.length - 1;
            }

            let alimentoPermitidoInRegistro = false;
            for (let tipoAlimento in tiposAlimentos) {
                for (let j = 0; j < tiposAlimentos[tipoAlimento].length; j++) {
                    const alimento = tiposAlimentos[tipoAlimento][j];

                    if (isValueInList(alimento, registro, tiposAlimentos) &&
                        registro.valor.toLowerCase().indexOf("frito") == (-1) &&
                        registro.valor.toLowerCase().indexOf("frita") == (-1)) {
                        alimentoPermitidoInRegistro = true;
                        if (barChartData[0].data[indexLabel]) {
                            barChartData[0].data[indexLabel] += 1
                        } else {
                            barChartData[0].data[indexLabel] = 1
                            if (!barChartData[1].data[indexLabel])
                                barChartData[1].data[indexLabel] = 0
                        }
                        break;
                    }
                }
            }
            if (!alimentoPermitidoInRegistro) {
                if (barChartData[1].data[indexLabel]) {
                    barChartData[1].data[indexLabel] += 1
                } else {
                    barChartData[1].data[indexLabel] = 1
                    if (!barChartData[0].data[indexLabel])
                        barChartData[0].data[indexLabel] = 0
                }
            }
        }

        dataForChart["labels"] = barChartLabels;
        dataForChart["amounts"] = barChartData;
        return dataForChart;
    }
    else if (chartType === 'sintomas' || 'actividadFisica') {
        let barChartLabels = [];
        let barChartData;

        let data3;
        if (chartType === 'sintomas') {
            data3 = data.filter(d => d.tipo.toLowerCase() === "síntoma");
            barChartData = [
                { data: [], label: 'Cantidad de Síntomas' }
            ];
        } else if (chartType === 'actividadFisica') {
            data3 = data.filter(d => d.tipo.toLowerCase() === "actividad física");
            barChartData = [
                { data: [], label: 'Cantidad de Entrenamientos' }
            ];
        }

        for (let i = 0; i < data3.length; i++) {
            const registro = data3[i];

            let week = getWeekOfTheYear(registro.datetime);
            let indexLabel = barChartLabels.indexOf("Semana " + week);
            if (indexLabel == -1) {
                barChartLabels.push("Semana " + week);
                indexLabel = barChartLabels.length - 1;
            }

            if (barChartData[0].data[indexLabel]) {
                barChartData[0].data[indexLabel] += 1
            } else {
                barChartData[0].data[indexLabel] = 1
            }
        }

        let aux = [];
        let start = +barChartLabels[0].split(' ')[1];
        for (let w = 0; w < barChartLabels.length; w++) {
            const e = +barChartLabels[w].split(' ')[1];
            console.log("start: " + start + " e: " + e);
            if (e !== start) {
                while (e !== start) {
                    aux.push("Semana " + start + ": " + 0);

                    if (start === 52) {
                        start = 1;
                    } else {
                        start += 1;
                    }
                }
            }
            if (start === 52) {
                start = 1;
            } else {
                start += 1;
            }
        }

        for (let j = 0; j < aux.length; j++) {
            const e = aux[j];
            for (let k = 0; k < barChartLabels.length; k++) {
                const a = barChartLabels[k];
                if (+a.split(" ")[1] - 1 === (+(e.split(":")[0].split(" ")[1]))) {
                    barChartLabels.splice(k + 1, 0, e.split(":")[0]);
                    barChartData[0].data.splice(k + 1, 0, +e.split(":")[1].trim());
                    break;
                }
            }
        }

        dataForChart["labels"] = barChartLabels;
        dataForChart["amounts"] = barChartData;

        return dataForChart;
    }
}

function isValueInList(alimento, registro, tiposAlimentos) {
    if (registro.tipo === 'comida' && !(tiposAlimentos["BEBIDAS"].indexOf(alimento) != -1)) {
        return registro.valor.toLowerCase().indexOf(alimento) != (-1)
    } else if (registro.tipo === 'bebida' && tiposAlimentos["BEBIDAS"].indexOf(alimento) != -1) {
        return registro.valor.toLowerCase() === alimento
    }
}

module.exports = {
    getDataForChartType
}

