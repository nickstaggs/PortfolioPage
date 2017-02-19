// set up ======================================================================
var express = require('express');
var favicon = require("serve-favicon");
var app = express(); 						// create our app w/ express
app.use(favicon(__dirname + "\\public\\images\\favicon.ico"));
//var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
//var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var fs = require('fs');
var winston = require("winston");

// configuration ===============================================================

// set the static files location /public/img will be /img for users app.use(express.static('./public'));
app.use(express.static('./public'));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// create a write stream (in append mode) C:\Users\Nick Staggs\Documents\PortfolioPage\public\images\favicon.ico
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the access logger
app.use(morgan('combined', {stream: accessLogStream}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

/*******************************************************************************
* LOGGER
*******************************************************************************/
const logger = new winston.Logger({
    level: 'verbose',
    transports: [
      new winston.transports.Console({
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      }),
      new winston.transports.File({
        filename: 'app.log',
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      })
    ]
  });

/******************************************************************************/

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
logger.info("App listening on port " + port);
logger.info(path.join(__dirname, 'public', 'images', 'favicon.ico'));
