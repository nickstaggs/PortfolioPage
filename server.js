require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const logger = require(path.join(__dirname, 'lib', 'logger.js'));
const http = require('http');
const config = require('./config/config.js');
const sessions = require('./sessions/index.js');
const blogposts = require('./blogposts');
const users = require('./users');
const files = require('./files');
const projects = require('./projects');
const content = require('./content');
const cors = require('cors');

// configuration ===============================================================

mongoose.connect(config.dbOptions.readWriteUrl, {
    auth: {
        user: config.dbOptions.username,
        password: config.dbOptions.password
    }
})
    .then(() => console.log("mongoose connection successful"))
    .catch((err) => console.log("mongoose connection successful: " + err));


// setup the access logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

var corsOptions = {
    origin: config.cors.origin,
    credentials: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(sessions);
app.use(blogposts);
app.use(users);
app.use(files);
app.use(projects);
app.use(content);

// routes ======================================================================
require('./routes.js')(app);

http.createServer(app).listen(config.connectionOptions.httpPort);

logger.info("App listening on port " + config.connectionOptions.httpPort);
