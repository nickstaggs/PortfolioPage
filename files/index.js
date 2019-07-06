var path = require('path');
var File = require('./files.js');
var User = require(path.join(__dirname, '..', 'users', 'user.js'));
var logger = require(path.join(__dirname, '..', 'lib', 'logger.js'));
var multer = require('multer')
var upload = multer({storage: multer.memoryStorage()})
var fs = require('fs');
const express = require('express');
const app = module.exports = express();

app.get('/api/files', (req, res) => {

    if (req.query.id != null) {
        File.findById(req.query.id, (err, file) => {
            logger.info(req.query.id);
            if (err) {

                logger.info("error");
                res.status(500).send(err);

            } else if (file === null) {

                res.status(404).send("That file does not exist");

            } else {

                res.json(file);
            }
        });
    }

    else if (req.query.name != null) {
        File.findOne({ name: req.query.name }, (err, file) => {
            logger.info(req.query.name);
            if (err) {

                logger.info("error");
                res.status(500).send(err);

            } else if (file === null) {

                res.status(404).send("That file does not exist");

            } else {
                res.contentType(file.type)
                res.send(file.data);
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
                logger.info("Unauthorized attempt to see all files by: " + req.session.username);
                res.status(401).send("You are not authorized");
            }

            else {
                File.find().lean().exec((err, files) => {

                    if (err) {
                        res.status(500).send(err);
                    }

                    logger.info("sending files");
                    res.json(files);
                });
            }

        });
    }

    else {
        res.status(400).send("Invalid request");
    }
    
});

app.get('/api/files/empty', (req, res) => {
    let file = {}
    
    file.name = "";
    file.data = "file";
    file.type = ""; 

    res.json(file);
});

app.get('/api/files/:id', (req, res) => {
    File.findById(req.params.id, (err, file) => {
        if (err) {
            logger.info(err);
            res.status(500).send(err);
        }

        res.contentType(file.type + ';base64');
        res.setHeader("Content-Length", file.data.length)
        res.send(file.data);
    })
});

app.post('/api/files', upload.single('data'), (req, res) => {
    User.findOne({ username: req.session.username }, 'username', (err, user) => {

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

            var fileObject = new File({name: req.body.name, data: req.file.buffer, type: req.body.type});

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

