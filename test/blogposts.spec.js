const dotenv = require('dotenv').config();
const expect = require('chai').expect;
const request = require('request');
const app = require('./../blogposts');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./../config/config.js');
var server;

describe('blogposts', function () {
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

  it('Should return non-empty body when getting blogposts', function(done) {
    request.get('http://localhost:8000/api/blogposts', function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.not.be.empty;
      done(err);
    });
  });
});
