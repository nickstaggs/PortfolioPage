// set up ======================================================================
var dotenv = require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var fs = require('fs');
var logger = require(path.join(__dirname, 'lib', 'logger.js'));
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var https = require('https');
var http = require('http');
var config = require('./config.js');

// configuration ===============================================================

mongoose.connect(config.dbOptions.readUrl);
// set the static files location
app.use(express.static('./client'));

// setup the access logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride('X-HTTP-Method-Override'));

var dbReadWriteConnect = mongoose.createConnection(config.dbOptions.readWriteUrl);

app.use(session({
  secret: process.env.secretSauce,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection : dbReadWriteConnect }),
  cookie: {secure: false},
  username: 'guest'
}));

// routes ======================================================================
require('./routes.js')(app);

var options = {
 key: fs.readFileSync(config.connectionOptions.privkey),
 cert: fs.readFileSync(config.connectionOptions.fullchain),
 ca: fs.readFileSync(config.connectionOptions.chain)
};

http.createServer(app).listen(config.connectionOptions.httpPort);
https.createServer(options, app).listen(config.connectionOptions.httpsPort);

logger.info("App listening on port " + config.connectionOptions.httpPort + " and " + config.connectionOptions.httpsPort);
