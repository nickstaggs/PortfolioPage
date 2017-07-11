var config = {};

config.dbOptions = {};
config.connectionOptions = {};


config.dbOptions.readUser = process.env.readUser || 'read';
config.dbOptions.readUserPass = process.env.readUserPass || 'password';
config.dbOptions.readWriteUser = process.env.readWriteUser || 'readWrite';
config.dbOptions.readWriteUserPass = process.env.readWriteUserPass || 'password';
config.dbOptions.blogger = process.env.blogger || 'blogger';
config.dbOptions.bloggerUserPass = process.env.bloggerUserPass || 'password';


config.dbOptions.readUrl = 'mongodb://' + config.dbOptions.readUser + ":"
                                        + config.dbOptions.readUserPass +'@localhost/portfolioDB';

config.dbOptions.readWriteUrl = 'mongodb://' + config.dbOptions.readWriteUser + ":"
                                             + config.dbOptions.readWriteUserPass +'@localhost/portfolioDB'

config.dbOptions.bloggerUrl = 'mongodb://' + config.dbOptions.blogger + ":"
                                           + config.dbOptions.bloggerUserPass +'@localhost/portfolioDB';

config.connectionOptions.httpPort = process.env.httpPort || '8000';
config.connectionOptions.httpsPort = process.env.httpsPort || '8443';

module.exports = config;


// var config = {};
//
// config.dbOptions = {};
// config.connectionOptions = {};
//
//
// config.dbOptions.readUser = process.env.readUser || 'read';
// config.dbOptions.readUserPass = process.env.readUserPass || 'password';
// config.dbOptions.readWriteUser = process.env.readWriteUser || 'readWrite';
// config.dbOptions.readWriteUserPass = process.env.readWriteUserPass || 'password';
// config.dbOptions.readWriteUser = process.env.blogger || 'blogger';
// config.dbOptions.readWriteUserPass = process.env.bloggerUserPass || 'password';
//
//
// config.dbOptions.readUrl = 'mongodb://' + config.dbOptions.readUser + ":"
//                                         + config.dbOptions.readUserPass +'@localhost/portfolioDB';
//
// config.dbOptions.readWriteUrl = 'mongodb://' + config.dbOptions.readWriteUser + ":"
//                                              + config.dbOptions.readWriteUserPass +'@localhost/portfolioDB';
//
// config.dbOptions.bloggerUrl = 'mongodb://' + config.dbOptions.blogger + ":"
//                                              + config.dbOptions.bloggerUserPass +'@localhost/portfolioDB';
//
//
// config.connectionOptions.httpPort = process.env.httpPort || '8000';
// config.connectionOptions.httpsPort = process.env.httpsPort || '8443';
//
// module.exports = config;