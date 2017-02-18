module.exports = function (app) {
  var path = require('path');
  app.get('*', function (req, res) {
    //path.resolve(__dirname, '.../public')
    res.sendFile('..\\public\\index.html'); 

    console.log(__dirname + " " + process.cwd());// load the single view file (angular will handle the page changes on the front-end)
  });
};
