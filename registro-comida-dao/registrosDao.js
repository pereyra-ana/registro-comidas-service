function getAll() {
    return [
        {
            "datetime": new Date(),
            "tipo": "Comida",
            "valor": "Banana",
            "cantidad": 1
        },
        {
            "datetime": new Date(),
            "tipo": "Síntoma",
            "valor": "Dolor de estómago",
            "intensidad": 2
        }
    ];
}

function addRegistries(registries) {
    console.log(registries);
}

module.exports = {
    getAll,
    addRegistries
}