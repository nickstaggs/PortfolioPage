var mongoose = require('mongoose');

module.exports = mongoose.model('blogPost', {
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
  }

  datePosted {
    type: Date,
    default Date.now
  }

  dateUpdated {
    type: Date,
    default: null
  }

  image {
    type: String,
    default: ''
  }
});
