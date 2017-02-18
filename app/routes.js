module.exports = function (app) {
  var path = require('path');
  app.get('*', function (req, res) {
    path.resolve(__dirname, '.../public')
    res.sendFile(__dirname + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
