var path = require('path');

var config = {};

config.dbOptions = {};
config.connectionOptions = {};
config.cors = {};

config.dbOptions.readWriteUrl = process.env.mongoHost;
config.dbOptions.username = process.env.mongoUsername;
config.dbOptions.password = process.env.mongoPassword;


let origins = process.env.corsOrigin;
let originsArr = origins.split(',');

config.cors.origin = originsArr || 'http://localhost:8080';



config.connectionOptions.httpPort = process.env.httpPort || '8000';

module.exports = config;
