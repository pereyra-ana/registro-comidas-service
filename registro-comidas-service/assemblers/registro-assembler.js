
function assemblyRegistry(jsonRegistros) {
    let registryList = [];
    jsonRegistros["entries"].forEach(r => {
        for (let k in r) {
            if (k === 'dishes') {
                // itero sobre los platos y armo un registro por cada uno
                r[k].forEach(d => {
                    let newRegistry = {};
                    newRegistry.tipo = 'comida';
                    newRegistry.valor = d.title.split("|")[0];
                    newRegistry.datetime = r.datetime;
                    newRegistry.cantidad = d.title.split("|")[1] ? d.title.split("|")[1] : 1;

                    newRegistry.tipoEvento = r.title;

                    registryList.push(newRegistry);
                });
            }
            if (k == 'drinks') {
                // itero sobre los platos y armo un registro por cada uno
                r[k].forEach(d => {
                    let newRegistry = {};
                    newRegistry.tipo = 'bebida';
                    newRegistry.valor = d.title.split("|")[0];
                    newRegistry.datetime = r.datetime;
                    newRegistry.cantidad = d.title.split("|")[1] ? d.title.split("|")[1] : 1;

                    newRegistry.tipoEvento = r.title;

                    registryList.push(newRegistry);
                });
            }
            else if (k == 'category') {
                let newRegistry = {};
                // es un miscelaneo o un sintoma
                if (r[k] === 'miscellaneous') {
                    newRegistry.tipo = 'misceláneo';
                    newRegistry.valor = r.title;
                    newRegistry.datetime = r.datetime;

                    newRegistry.tipoEvento = 'actividad física'

                    registryList.push(newRegistry)
                }
                if (r[k] === 'symptom') {
                    newRegistry.tipo = 'síntoma';
                    newRegistry.valor = r.title;
                    newRegistry.datetime = r.datetime;

                    newRegistry.tipoEvento = 'síntoma';
                    
                    registryList.push(newRegistry)
                }
            }
        }
    });

    let username = jsonRegistros["username"];
    return registryList;
}

module.exports = {
    assemblyRegistry
}

