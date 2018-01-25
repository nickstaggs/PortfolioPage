var path = require('path');
var logger = require(path.join(__dirname, 'lib', 'logger.js'));
var fs = require('fs');
var config = require('./config/config.js');

module.exports = function (app) {

  app.get('/', function(req, res) {

    var session = req.session;
    if (!req.session.user) {
      session.user='guest';
    }

    logger.info(req.session.user);

    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });


  app.get('*', function(req, res) {

    var session = req.session;

    if (!req.session.user) {
      session.user='guest';
    }

    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });
}
