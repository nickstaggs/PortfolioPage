var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var config = require('./../config/config.js');
var mongoose = require('mongoose');
var dbReadWriteConnect = mongoose.createConnection(config.dbOptions.readWriteUrl, {
  auth: {
    user: config.dbOptions.username,
    password: config.dbOptions.password
  }
})

module.exports = session({
  secret: process.env.secretSauce,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection : dbReadWriteConnect }),
  cookie: {secure: false},
  username: 'guest'
});
