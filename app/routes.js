var BlogPost = require('./models/blogPost.js');
var User = require('./models/user.js');
var bcrypt = require('bcryptjs');
var winston = require("winston");
var fs = require('fs');
var config = require('../config');
var path = require('path');
var mongoose = require('mongoose');

/*=====================  LOGGER  ======================*/
  const logger = new winston.Logger({
      level: 'verbose',
      transports: [
        new winston.transports.Console({
          timestamp: true,
          handleExceptions: true,
          humanReadableUnhandledException: true
        }),
        new winston.transports.File({
          filename: path.join(__dirname, "..", 'logs', 'app.log'),
          timestamp: true,
          handleExceptions: true,
          humanReadableUnhandledException: true
        })
      ]
    });
/*=====================================================*/

module.exports = function (app) {

  app.get('/blogposts', function(req, res) {
    BlogPost.find(function(err, blogPosts) {

      if (err) {
        res.send(err);
      }

      res.json(blogPosts);
    });
  });

  app.get('/blogPosts/:blogpostId', function(req, res) {

    BlogPost.findOne({'_id': req.params.blogpostId }, function(err, blogPost) {
      logger.info(req.params.blogpostId);
      if(err) {
        logger.info("error");
        res.send(err);
      }

      if (blogPost === null) {
        res.send();
      }

      //logger.info(blogPost.title);
      res.json(blogPost);
    });
  });

  app.post('/user', function(req, res) {

    var session = req.session;

    logger.info(req.body.username);
    logger.info(req.body.password);
    logger.info(req.session.id);
    logger.info(req.ip);

    logger.info("outside query");

    var myIP = '::1'
    //if (req.ip === process.env.myIP) {
    if (req.ip === myIP) {

      User.findOne({ username: req.body.username }, 'username password', function(err, user) {
        logger.info("inside query");
        if(err) {
          res.send(err);
        }

        if(user === null) {
          res.send();

        }

        if (user) {

          bcrypt.compare(req.body.password, user.password, function(err, isPassword) {
            logger.info(user.password);
            if (!isPassword) {
              // user name or password incorrect
              res.send("err");
            }

            else {

              // send post blog page
              // set req.session.user to user
              mongoose.connection.close()

              mongoose.connection.on('close', function() {

                mongoose.connect(config.dbOptions.readWriteUrl);

                req.session.username = user.username;
                res.send({redirect: '/WriteBlogPost'});
              });
            }
          });
        }
      });

      logger.info("past query");
    }

    else {
      // send 404 or something
    }
  });

  app.post('/WriteBlogPost', function(req, res) {

    User.findOne({ username: req.session.username }, 'username', function(err, user) {

      if(err) {
        logger.info('error in db lookup');
        res.send(err);
      }

      if(user === null) {
        logger.info("Unauthorized attempt to post blog by: " + req.session.username);
        res.send(err);
      }

      else {
        var post = new BlogPost({title: req.body.title,
          body: req.body.body, tags: req.body.tags, image: req.body.image});

        post.save(function(err) {
          if(err) {
            logger.info('DB did not create record')
            res.send(false);
          }

          else {
            res.send(true);
          }
        });
      }
    });
  });


  app.get('/', function(req, res) {

    var session = req.session;
    if (!req.session.user) {
      session.user='guest';
    }

    logger.info(req.session.guest);

    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });


  app.get('*', function(req, res) {

    var session = req.session;

    if (!req.session.user) {
      session.user='guest';
    }

    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });
}
