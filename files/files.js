var mongoose = require('mongoose');
mongoose.promise = global.promise;
var Schema = mongoose.Schema;

var fileSchema = new Schema({

    name: {
        type: String
    },

    data: {
        type: Buffer
    },

    type: {
        type: String
    },
}, {
    collection: 'files',
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

module.exports = mongoose.model('File', fileSchema);
