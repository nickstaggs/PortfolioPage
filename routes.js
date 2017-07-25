var BlogPost = require('./models/blogPost.js');
var User = require('./models/user.js');
var bcrypt = require('bcryptjs');
var winston = require("winston");
var fs = require('fs');
var config = require('config.js');
var path = require('path');
var mongoose = require('mongoose');
var moment = require('moment');

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

      logger.info(blogPost.datePosted + " time");
      blogPost.datePosted = moment(blogPost.datePosted).format('MMMM Do YYYY, h:mm a');
      logger.info(moment(blogPost.datePosted).format('MMMM Do YYYY, h:mm a'));
      logger.info(blogPost.recentEditTime);
      //logger.info(blogPost.title);
      res.json(blogPost);
    });
  });

  app.post('/blogPosts', function(req, res) {

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

  app.post('/users', function(req, res) {

    var session = req.session;

    logger.info(req.body.username);
    logger.info(req.body.password);
    logger.info(req.session.id);
    logger.info(req.ip);

    logger.info("outside query");

    //if (req.ip === process.env.myIP) {
    //if (req.ip === myIP) {

    User.findOne({ username: req.body.username }, 'username password', function(err, user) {
      logger.info("inside query");
      if(err) {
        res.send('err1');
      }

      if(user === null) {
        res.send('err2');

      }

      if (user) {

        bcrypt.compare(req.body.password, user.password, function(err, isPassword) {
          logger.info(user.password);
          if (!isPassword) {
            // user name or password incorrect
            res.send("err3");
          }

          else {

            // send post blog page
            // set req.session.user to user
            mongoose.connection.close()

            logger.info("passed close connection");

            mongoose.connection.on('close', function() {

              mongoose.connect(config.dbOptions.bloggerUrl);
              logger.info("Logged in");
              req.session.username = user.username;
              res.send({redirect: '/WriteBlogPost'});
            });
          }
        });
      }

    });

    logger.info("past query");

  });

  app.get('/', function(req, res) {

    var session = req.session;
    if (!req.session.user) {
      session.user='guest';
    }

    logger.info(req.session.user);

    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });


  app.get('*', function(req, res) {

    var session = req.session;

    if (!req.session.user) {
      session.user='guest';
    }

    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });
}
