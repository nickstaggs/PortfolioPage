var path = require('path');
var BlogPost = require('./blogPost.js');
var File = require('../files/files.js');
var User = require(path.join(__dirname, '..', 'users', 'user.js'));
var logger = require(path.join(__dirname, '..', 'lib', 'logger.js'));
var moment = require('moment');
var showdown = require('showdown');
var showdownHighlight = require('showdown-highlight');
var converter = new showdown.Converter({ extensions: [showdownHighlight] });
var mongoose = require('mongoose');
converter.setFlavor('github');

const express = require('express');
const app = module.exports = express();

app.get('/api/blogposts', (req, res) => {
  BlogPost.find().lean().exec((err, blogPosts) => {

    if (err) {
      res.status(500).send(err);
    }

    var i;
    for (i = 0; i < blogPosts.length; i++) {
      blogPosts[i].datePosted = moment(blogPosts[i].datePosted).format('MMMM Do, YYYY');
    }

    logger.info("sending blogPosts");
    res.json(blogPosts);
  });
});

app.get('/api/blogPosts/:blogpostUrl', (req, res) => {

  BlogPost.findOne({'url': req.params.blogpostUrl }, (err, blogPost) => {
    logger.info(req.params.blogpostUrl);
    if(err) {

      logger.info("error");
      res.status(500).send(err);

    } else if (blogPost === null) {

      res.status(404).send("That blogpost does not exist");

    } 
    
    else {

      let post = {};

      let blogFile;
      File.findById(blogPost.file, (err, file) => {
        if(err) {
          logger.info("Oops couldnt retrieve blogpost file: " + err);
          res.status(500).send(err);
        }

        else {
          blogFile = file;
          let buffer = new Buffer(blogFile.data, 'base64');
          let text = buffer.toString('utf8');
          post.body = converter.makeHtml(text);
          post.date = moment(blogPost.datePosted).format('MMMM Do, YYYY');
          post.title = blogPost.title;
          post.tags = blogPost.tags;

          logger.info(blogPost.datePosted + " time");

          logger.info(moment(blogPost.datePosted).format('MMMM Do YYYY, h:mm a'));
          res.json(post);
        }
      });
    }
  });
});

app.post('/api/blogPosts', (req, res) => {

  User.findOne({ username: req.session.username }, 'username', (err, user) => {

    if(err) {
      logger.info('error in db lookup for: ' + req.session.username);
      logger.info(err)
      res.status(500).send(err);
    }

    else if(user === null) {
      logger.info("Unauthorized attempt to post blog by: " + req.session.username);
      res.status(401).send("You are not authorized to post a blogpost");
    }

    else {
      var post = new BlogPost({title: req.body.title,
        file: mongoose.Types.ObjectId(req.body.file), url: req.body.url, summary:req.body.summary, tags: req.body.tags});

      if (req.body.datePosted != null) {
        post.datePosted = req.body.datePosted;
      }

      post.save((err) => {
        if(err) {
          logger.info('DB did not create record');
          logger.info(err);
          res.status(500).send(false);
        } else {
          res.send(true);
        }
      });
    }
  });
});
