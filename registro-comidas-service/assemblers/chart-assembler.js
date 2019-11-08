let tiposAlimentos = {
    "CEREALES": [
        "almidon de maiz",
        "fecula de maiz",
        "semola",
        "semolin",
        "polenta",
        "arroz blanco",
        "avena",
        "fideos",
        "copos",
        "cereales de arroz",
        "sopa de letras"
    ],
    "SALSAS": [
        "tuco casero",
        "salsa bechamel"
    ],
    "PAN": [
        "tostadas",
        "galletitas de agua",
        "bizcochitos 9deoro de arroz",
        "grisines"
    ],
    "HORTALIZAS": [
        "zapallo",
        "zanahoria",
        "zuchini",
        "chauchas",
        "tomate",
        "esparragos",
        "berenjena",
        "batata",
        "papa",
        "papines",
        "alcaucil",
        "palmito",
        "caldo de verduras",
        "calabaza",
        "remolacha"
    ],
    "FRUTAS": [
        "banana",
        "manzana",
        "pera",
        "durazno",
        "melon",
        "damasco",
        "membrillo"
    ],
    "CARNES": [
        "pollo",
        "merluza",
        "lenguado",
        "brotola",
        "mero",
        "pez espada",
        "peceto",
        "nalga",
        "lomo",
        "cuadril",
        "bola de lomo",
        "costillitas de cerdo",
        "solomillo de cerdo",
        "carre de cerdo",
        "carne"
    ],
    "HUEVO": [
        "huevo"
    ],
    "QUESOS": [
        "queso port salut",
        "queso blanco",
        "queso cremoso"
    ],
    "LACTEOS": [
        "leche deslactosada"
    ],
    "POSTRES": [
        "gelatina",
        "flan sin caramelo"
    ],
    "BEBIDAS": [
        "te",
        "agua",
        "jugo",
        "cafe descafeinado",
        "mate cocido",
        "te verde",
        "cafe descafeinado con leche deslactosada"
    ]
};

function getWeekOfTheYear(date) {
    var d = new Date(+date);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
}

function getDataForChartType(chartType, data) {
    let dataForChart = {};

    switch (chartType) {
        case 'alimentosVsTotal':
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
            break;
        case 'tiposAlimentosVsTotal':
            let hashResultados = {};
            let otrosLabel = ["OTROS:"];
            let hashValues = {};

            let dataFood = data.filter(d => d.tipo === "comida" || d.tipo === "bebida")

            for (let i = 0; i < dataFood.length; i++) {
                const registro = dataFood[i];
                let alimentoPermitidoInRegistro = false;
                for (let tipoAlimento in tiposAlimentos) {
                    for (let j = 0; j < tiposAlimentos[tipoAlimento].length; j++) {
                        const alimento = tiposAlimentos[tipoAlimento][j];

                        if (isValueInList(alimento, registro) &&
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

                        } else if (isValueInList(alimento, registro) &&
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
            break;
        case 'permitidosVsNo':
            let barChartLabels = [];
            let barChartData = [
                { data: [], label: 'Permitidos' },
                { data: [], label: 'No Permitidos' }
            ];

            let dataFood2 = data.filter(d => d.tipo === "comida" || d.tipo === "bebida")

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

                        if (isValueInList(alimento, registro) &&
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
            break;
        default:
            break
    }
    return dataForChart;
}

function isValueInList(alimento, registro) {
    if (registro.tipo === 'comida' && !(tiposAlimentos["BEBIDAS"].indexOf(alimento) != -1)) {
        return registro.valor.toLowerCase().indexOf(alimento) != (-1)
    } else if (registro.tipo === 'bebida' && tiposAlimentos["BEBIDAS"].indexOf(alimento) != -1) {
        return registro.valor.toLowerCase() === alimento
    }
}

module.exports = {
    getDataForChartType
}

