var mongoose = require('mongoose');
mongoose.promise = global.promise;
var Schema = mongoose.Schema;

var contentSchema = new Schema({

    name: {
        type: String,
        default: ""
    },

    data: {
        type: String,
        default: ""
    },
}, 
{
    collection: 'content',
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

module.exports = mongoose.model('Content', contentSchema);
