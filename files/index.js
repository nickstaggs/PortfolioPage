var path = require('path');
var File = require('./files.js');
var User = require(path.join(__dirname, '..', 'users', 'user.js'));
var logger = require(path.join(__dirname, '..', 'lib', 'logger.js'));
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
var mongoose = require('mongoose');
const config = require('./../config/config.js');

const express = require('express');
const app = module.exports = express();

app.get('/api/files', function (req, res) {

    User.findOne({ username: req.session.username }, 'username', function (err, user) {

        if (err) {
            logger.info('error in db lookup for: ' + req.session.username);
            logger.info(err)
            res.status(500).send(err);
        }

        else if (user === null) {
            logger.info("Unauthorized attempt to see all files by: " + req.session.username);
            res.status(401).send("You are not authorized");
        }

        else {
            File.find().lean().exec(function (err, files) {

                if (err) {
                    res.status(500).send(err);
                }

                logger.info("sending files");
                res.json(files);
            });
        }
    
    });
});

app.get('/api/files/:id', function (req, res) {

    File.findById(req.params.id, function (err, file) {
        logger.info(req.params.id);
        if (err) {

            logger.info("error");
            res.status(500).send(err);

        } else if (file === null) {

            res.status(404).send("That file does not exist");

        } else {
            res.contentType(post.type)
            res.send(post.data);
        }
    });
});

app.post('/api/files', upload.single('file'), (req, res) => {
    User.findOne({ username: req.session.username }, 'username', function (err, user) {

        if (err) {
            logger.info('error in db lookup for: ' + req.session.username);
            logger.info(err)
            res.status(500).send(err);
        }

        else if (user === null) {
            logger.info("Unauthorized attempt to see all files by: " + req.session.username);
            res.status(401).send("You are not authorized");
        }

        else {
            var file = fs.readFileSync(req.file.path);
            var encode_file = file.toString('base64');

            var fileObject = new File({name: req.body.name, data: new Buffer(encode_file, 'base64'), type: req.body.type});

            fileObject.save((err) => {
                if (err) {
                    logger.info('DB did not save file');
                    logger.info(err);
                    res.status(500).send(false);
                } else {
                    res.send(true);
                }
            });
        }
    });
})

