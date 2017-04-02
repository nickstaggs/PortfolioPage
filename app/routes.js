module.exports = function (app) {

  var path = require('path');
  var logger = require('winston');
  logger.add(logger.transports.File, { filename: 'routesjs.log' });

  app.get('/', function (req, res) {
    //path.resolve(__dirname, '.../public')
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));

    logger.info("Request: " + req + "\nResponse: " + res);
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'templates','404.html'));

    logger.info("Request: " + req + "\nResponse: " + res);
  });
}
