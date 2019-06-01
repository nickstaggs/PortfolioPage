var path = require('path');

var config = {};

config.dbOptions = {};
config.connectionOptions = {};
config.cors = {};

config.dbOptions.readWriteUrl = process.env.mongoHost
config.dbOptions.username = process.env.mongoUsername
config.dbOptions.password = process.env.mongoPassword

config.cors.origin = process.env.corsOrigin || 'http://localhost:8080'

config.connectionOptions.httpPort = process.env.httpPort || '8000';
config.connectionOptions.httpsPort = process.env.httpsPort || '8443';
config.connectionOptions.privkey = process.env.privkey || path.join(__dirname, '..', 'www.nickstaggs.com', 'privkey.pem');
config.connectionOptions.fullchain = process.env.fullchain || path.join(__dirname, '..', 'www.nickstaggs.com', 'fullchain.pem');
config.connectionOptions.chain = process.env.chain || path.join(__dirname, '..', 'www.nickstaggs.com', 'chain.pem');

module.exports = config;
