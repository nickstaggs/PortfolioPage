var path = require('path');
var logger = require(path.join(__dirname, 'lib', 'logger.js'));

module.exports = function (app) {

  app.get('/', function(req, res) {

    var session = req.session;
    if (!req.session.user) {
      session.user='guest';
    }

    logger.info(req.session.user);
  });


  app.get('*', function(req, res) {

    var session = req.session;

    if (!req.session.user) {
      session.user='guest';
    }
  });
}
