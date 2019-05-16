var mongoose = require('mongoose');
mongoose.promise = global.promise;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var blogPostSchema = new Schema({

  title: {
    type: String
  },

  file: {
    type: [ObjectId]
  },

  url: {
    type: String
  },

  summary: {
    type: String
  },

  images: {
    type: [ObjectId]
  },

  tags: {
    type: [String]
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
