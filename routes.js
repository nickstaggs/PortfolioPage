var path = require('path');
var logger = require(path.join(__dirname, 'lib', 'logger.js'));

module.exports = function (app) {

  app.use(function(req, res, next) {

    var session = req.session;
    if (!req.session.user) {
      session.user='guest';
    }

    logger.info(req.session.user);

    next();
  });


  app.get('*', function(req, res) {

    var session = req.session;

    if (!req.session.user) {
      session.user='guest';
    }

    res.send("Oops, that page doesn't exist",404);
  });
}
