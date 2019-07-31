var mongoose = require('mongoose');
mongoose.promise = global.promise;
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var projectSchema = new Schema({

    name: {
        type: String,
        default: ""
    },

    picture: {
        type: ObjectId
    },

    summary: {
        type: String,
        default: ""
    },

    technologies: {
        type: [String]
    },

    dateStarted: {
        type: Date,
        default: Date.now
    },

    website: {
        type: String,
        default: ""
    },

    repositorySite: {
        type: String,
        default: ""
    }

}, {
    collection: 'projects',
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

module.exports = mongoose.model('Project', projectSchema);
