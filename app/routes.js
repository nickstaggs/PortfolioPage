module.exports = function (app) {
  var path = require('path');
  var winston = require('winston');
  //winston.add(winston.transports.File, { filename: 'routesjs.log' });

  app.get('/', function (req, res) {
    //path.resolve(__dirname, '.../public')
    res.sendFile(__dirname+ '\\..\\public\\index.html');

    logger.info("Request: " + req + "\nResponse: " + res);
  });
};
