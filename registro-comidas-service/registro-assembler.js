
function assemblyRegistry(jsonRegistros) {
    let registryList = [];
    jsonRegistros["entries"].forEach(r => {
        for (let k in r) {
            // r.keys().forEach(k => {
            if (k === 'dishes') {
                // itero sobre los platos y armo un registro por cada uno
                r[k].forEach(d => {
                    let newRegistry = {};
                    newRegistry.tipo = 'comida';
                    newRegistry.valor = d.title.split("|")[0];
                    newRegistry.datetime = r.datetime;
                    newRegistry.cantidad = d.title.split("|")[1];
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
                    newRegistry.cantidad = d.title.split("|")[1];
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
                    registryList.push(newRegistry)
                }
                if (r[k] === 'symptom') {
                    newRegistry.tipo = 'síntoma';
                    newRegistry.valor = r.title;
                    newRegistry.datetime = r.datetime;
                    registryList.push(newRegistry)
                }
            }
        }
    });
    // console.log(":::::::::::::::::: Registry list: ")
    // console.log(registryList);

    let username = jsonRegistros["username"];

    console.log(username);
    return registryList;
}

module.exports = {
    assemblyRegistry
}

