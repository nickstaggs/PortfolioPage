var path = require('path');
var Content = require('./content.js');
var User = require(path.join(__dirname, '..', 'users', 'user.js'));
var logger = require(path.join(__dirname, '..', 'lib', 'logger.js'));
const express = require('express');
const app = module.exports = express();

app.get('/api/content', (req, res) => {

    if (req.query.id != null) {
        Content.findById(req.query.id, (err, content) => {
            logger.info(req.query.id);
            if (err) {

                logger.info("error");
                res.status(500).send(err);

            } else if (content === null) {

                res.status(404).send("That content does not exist");

            } else {

                res.json(content);
            }
        });
    }

    else if (req.query.name != null) {
        Content.findOne({ name: req.query.name }, (err, content) => {
            logger.info(req.query.name);
            if (err) {

                logger.info("error");
                res.status(500).send(err);

            } else if (content === null) {

                res.status(404).send("That content does not exist");

            } else {
                res.send(content.data);
            }
        });
    }

    else if (Object.entries(req.query).length === 0 && req.query.constructor === Object) {
        User.findOne({ username: req.session.username }, 'username', (err, user) => {

            if (err) {
                logger.info('error in db lookup for: ' + req.session.username);
                logger.info(err)
                res.status(500).send(err);
            }

            else if (user === null) {
                logger.info("Unauthorized attempt to see all content by: " + req.session.username);
                res.status(401).send("You are not authorized");
            }

            else {
                Content.find().lean().exec((err, content) => {

                    if (err) {
                        res.status(500).send(err);
                    }

                    logger.info("sending content");
                    res.json(content);
                });
            }

        });
    }

    else {
        res.status(400).send("Invalid request");
    }
    
});

app.get('/api/content/empty', (req, res) => {
    let content = (new Content()).toObject();

    res.json(content);
});

app.get('/api/content/:id', (req, res) => {
    Content.findById(req.params.id, (err, content) => {
        if (err) {
            logger.info(err);
            res.status(500).send(err);
        }

        res.send(content.data);
    })
});

app.post('/api/content', (req, res) => {
    User.findOne({ username: req.session.username }, 'username', (err, user) => {

        if (err) {
            logger.info('error in db lookup for: ' + req.session.username);
            logger.info(err)
            res.status(500).send(err);
        }

        else if (user === null) {
            logger.info("Unauthorized attempt to see all content by: " + req.session.username);
            res.status(401).send("You are not authorized");
        }

        else {

            var contentObject = new Content({name: req.body.name, data: req.body.data});

            contentObject.save((err) => {
                if (err) {
                    logger.info('DB did not save content');
                    logger.info(err);
                    res.status(500).send(false);
                } else {
                    res.send(true);
                }
            });
        }
    });
})

