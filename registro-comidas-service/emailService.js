const Email = require('email-templates');
const chartService = require('../registro-comidas-service/chartsService');
const registryService = require('../registro-comidas-service/registrosService');
const config = require('../app.config');

let startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
let endDate = new Date();

async function getValuesForEmail() {
    let aux = await chartService.getData(startDate, endDate, 'tiposAlimentosVsTotal');
    let aux2 = await chartService.getData(startDate, endDate, 'permitidosVsNo');
    let allValues = await registryService.getAll(startDate, endDate, null);
    console.log(allValues)
    return [aux["values"], aux2, allValues]
}

const email = new Email({
    message: {
        from: config.email.from,
        subject: config.email.subject,
        to: config.email.to

    },
    send: true,
    transport: {
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    }
});

function sendEmail() {
    aux = getValuesForEmail().then(result => {
        email.send({
            template: 'templates',
            message: {
                to: config.email.to
            },
            locals: {
                name: config.email.name,
                values: result,
                startDate: startDate,
                endDate: endDate
            }
        })
            .then(console.log)
            .catch(console.error);
    });

}

module.exports = {
    sendEmail,
}