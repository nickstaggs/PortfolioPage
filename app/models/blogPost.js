var mongoose = require('mongoose');

module.exports = mongoose.model('blogPost', {
  id: {
    type:Schema.Types.ObjectId
  },

  title: {
    type: String,
    default: ''
  },

  body: {
    type: String,
    default: ''
  },

  tags: {
    type: [String],
    default: null
  },

  datePosted {
    type: Date,
    default Date.now
  },

  dateUpdated {
    type: Date,
    default: null
  },

  image {
    type: String,
    default: ''
  },

  url {
    type: String,
    default: ''
  }
});
