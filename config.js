var config = {};

config.dbOptions = {};
config.connectionOptions = {};


config.dbOptions.readUser = process.env.readUser || 'read';
config.dbOptions.readUserPass = process.env.readUserPass || 'password';
config.dbOptions.readWriteUser = process.env.readWriteUser || 'blogger';
config.dbOptions.readWriteUserPass = process.env.readWriteUserPass || 'password';


config.dbOptions.readUrl = 'mongodb://' + config.dbOptions.readUser + ":"
                                        + config.dbOptions.readUserPass +'@localhost/portfolioDB';

config.dbOptions.readWriteUrl = 'mongodb://' + config.dbOptions.readWriteUser + ":"
                                             + config.dbOptions.readWriteUserPass +'@localhost/portfolioDB'


config.connectionOptions.httpPort = process.env.httpPort || '8000';
config.connectionOptions.httpsPort = process.env.httpsPort || '8443';

module.exports = config;
