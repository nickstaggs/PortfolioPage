var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogPostSchema = new Schema({

  title: {
    type: String
  },

  fileName: {
    type: String
  },

  url: {
    type: String
  },

  summary: {
    type: String
  },

  tags: {
    type: String
  },

  datePosted: {
    type: Date,
    default: Date.now
  },
}, {collection: 'blogposts',
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
