var path = require('path');
var logger = require(path.join(__dirname, '..', 'lib', 'logger.js'));
var Project = require('./project.js');
var File = require('../files/files.js');
var User = require(path.join(__dirname, '..', 'users', 'user.js'));
var mongoose = require('mongoose');
const express = require('express');
const app = module.exports = express();

app.get('/api/projects', (req, res) => {

    if (req.query.id != null) {
        Project.findById(req.query.id, (err, project) => {
            logger.info(req.query.id);
            if (err) {

                logger.info("error");
                res.status(500).send(err);

            } else if (project === null) {

                res.status(404).send("That project does not exist");

            } else {

                res.json(project);
            }
        });
    }

    else if (req.query.name != null) {
        Project.findOne({ name: req.query.name }, (err, project) => {
            logger.info(req.query.name);
            if (err) {

                logger.info("error");
                res.status(500).send(err);

            } else if (project === null) {

                res.status(404).send("That project does not exist");

            } else {
                
                res.json(project);
            }
        });
    }

    else if (req.query.latest !== undefined && req.query.latest === "true") {
        Project.find().sort({dateStarted: -1}).limit(1).exec((err, project) => {
            if (err) {
                logger.info("error");
                res.status(500).send(err);
            }

            else {
                res.json(project);
            }
        })
    }

    else if (Object.entries(req.query).length === 0 && req.query.constructor === Object) {

        Project.find().lean().exec((err, projects) => {

            if (err) {
                res.status(500).send(err);
            }

            logger.info("sending projects");
            res.json(projects);
        });
            
    }

    else {
        res.status(400).send("Invalid request");
    }
    
});

app.get('/api/projects/empty', (req, res) => {
    let project = (new Project()).toObject();

    File.find({}, 'name _id').lean().exec((err, files) => {

        if (err) {
            res.status(500).send(err);
        }

        project.picture = new Array(...files);

        res.json(project);
    });
    
});

app.get('/api/projects/:id', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {
            logger.info(err);
            res.status(500).send(err);
        }

        res.contentType(project.type);
        res.send(project.data);
    })
});

app.post('/api/projects', (req, res) => {
    User.findOne({ username: req.session.username }, 'username', (err, user) => {

        if (err) {
            logger.info('error in db lookup for: ' + req.session.username);
            logger.info(err)
            res.status(500).send(err);
        }

        else if (user === null) {
            logger.info("Unauthorized attempt to see all projects by: " + req.session.username);
            res.status(401).send("You are not authorized");
        }

        else {

            var projectObject = new Project({name: req.body.name, 
                picture: mongoose.Types.ObjectId(req.body.picture),
                summary: req.body.summary, 
                website: req.body.website,
                repositorySite: req.body.repositorySite,
                technologies: req.body.technologies.split(',')});

            if (req.body.dateStarted !== null && req.body.dateStarted === "") {
                projectObject.datePosted = req.body.datePosted;
            }

            projectObject.save((err) => {
                if (err) {
                    logger.info('DB did not save project');
                    logger.info(err);
                    res.status(500).send(false);
                } else {
                    res.send(true);
                }
            });
        }
    });
})

