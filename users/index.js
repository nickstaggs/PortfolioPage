var path = require('path');
var User = require('./user.js');
var bcrypt = require('bcryptjs');
var logger = require(path.join(__dirname, '..', 'lib', 'logger.js'));
var fs = require('fs');
var config = require('./../config/config.js');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

const express = require('express');
const app = module.exports = express();

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.post('/api/users', function(req, res) {

  var session = req.session;

  logger.info(req.body.username);

  User.findOne({ username: req.body.username }, 'username password', function(err, user) {

    if(err) {
      res.status(500).send(err);

    } else if(user === null) {
      res.status(402).send('Either your username or password were incorrect');

    } else if (user) {

      bcrypt.compare(req.body.password, user.password, function(err, isPassword) {

        if (!isPassword) {
          res.status(402).send('Either your username or password were incorrect');

        } else {

          logger.info(req.body.username + " logged in");
          req.session.username = user.username;
          res.send(true);
        }
      });

    } else {
      res.status(500).send("Oops something went wrong, please try again");
    }
  });
});
