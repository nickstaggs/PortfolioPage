const dotenv = require('dotenv').config();
const expect = require('chai').expect;
var request = require('request');
const app = require('./../users');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./../config/config.js');

var server;

describe('User', function () {
  before(function (done) {
    server = http.createServer(app).listen(8000);
    mongoose.connect(config.dbOptions.readUrl, function(err) {
      if (err) {
        console.error('Error while connecting:\n%\n', err);
      } else {
        console.log('connected');
      }
      done(err);
    });
  });

  after(function (done) {
    server.close();
    mongoose.disconnect();
    done();
  });

  it('Should deny an incorrect username or password', function(done) {
    request.post({url:'http://localhost:8000/api/users', body: JSON.stringify({username:'test', password:'test'})}, function(err, response, body) {
      console.log(body);
      console.log(err);
      expect(body).to.equal('Either your username or password were incorrect');
      done(err);
    });
  });
});
