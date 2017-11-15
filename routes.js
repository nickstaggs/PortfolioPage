var path = require('path');
var BlogPost = require(path.join(__dirname, 'models', 'blogPost.js'));
var User = require(path.join(__dirname, 'models', 'user.js'));
var bcrypt = require('bcryptjs');
var winston = require("winston");
var fs = require('fs');
var config = require('./config.js');
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
          filename: path.join(__dirname, 'logs', 'app.log'),
          timestamp: true,
          handleExceptions: true,
          humanReadableUnhandledException: true
        })
      ]
    });
/*=====================================================*/

module.exports = function (app) {

  app.get('/api/blogposts', function(req, res) {
    BlogPost.find(function(err, blogPosts) {

      if (err) {
        res.send(err);
      }

      logger.info("sending blogPosts");
      res.json(blogPosts);
    });
  });

  app.get('/api/blogPosts/:blogpostUrl', function(req, res) {

    BlogPost.findOne({'url': req.params.blogpostUrl }, function(err, blogPost) {
      logger.info(req.params.blogpostUrl);
      if(err) {

        logger.info("error");
        res.send(err);

      } else if (blogPost === null) {

        res.send();

      } else {

        let post = {};

        post.date = moment(blogPost.datePosted).format('MMMM Do, YYYY');
        post.url = blogPost.url;
        post.fileName = blogPost.fileName;
        post.summary = blogPost.summary;
        post.title = blogPost.title;
        post.tags = blogPost.tags;

        logger.info(blogPost.datePosted + " time");

        logger.info(moment(blogPost.datePosted).format('MMMM Do YYYY, h:mm a'));
        res.json(post);
      }
    });
  });

  app.post('/api/blogPosts', function(req, res) {

    User.findOne({ username: req.session.username }, 'username', function(err, user) {

      if(err) {
        logger.info('error in db lookup for: ' + req.session.username);
        logger.info(err)
        res.send(err);
      }

      else if(user === null) {
        logger.info("Unauthorized attempt to post blog by: " + req.session.username);
        res.send(err);
      }

      else {
        var post = new BlogPost({title: req.body.title,
          fileName: req.body.fileName, url: req.body.url, summary:req.body.summary, tags: req.body.tags});

        post.save(function(err) {
          if(err) {
            logger.info('DB did not create record');
            logger.info(err);
            res.send(false);
          } else {
            res.send(true);
          }
        });
      }
    });
  });

  app.post('/api/users', function(req, res) {

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
