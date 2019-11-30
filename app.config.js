let config = {};

config.db = {};

config.db.host = '54.91.59.54';
config.db.port = '27017';
config.db.name = 'mydb';

config.email = {};

config.email.host = 'smtp.googlemail.com';
config.email.port = 465;
config.email.secure = true;
config.email.user = 'foodregistry.info';
config.email.pass = '';
config.email.form = "fr@info.com.ar";
config.email.subject = "Registro semanal de Food Registry";
config.email.to = "pereyra.ana12@gmail.com";
config.email.name = 'Ana'

config.cron = {};
config.cron.emailFrequency = '59 2 * * 1';
config.cron.notificationFrequency = '*/1 * * * *';

module.exports = config