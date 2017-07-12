var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogPostSchema = new Schema({

  title: {
    type: String
  },

  body: {
    type: String
  },

  tags: {
    type: String
  },

  datePosted: {
    type: Date,
    default: Date.now
  },

  dateUpdated: {
    type: Date,
    default: null
  },

  image: {
    type: String,
    default: null
  }
}, {collection: 'blogposts',
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
});

// Maybe better as actual field to reduce overhead when accessing blog post
// could be done in controller when info is sent in creation
blogPostSchema.virtual('url').get(function() {
    return this.title.replace(/(\.*\s+)|\.+/g, '_');
});

blogPostSchema.virtual('summary').get(function() {
    return this.body.substring(0,50) + "...";
});

blogPostSchema.virtual('recentEditTime').get(function() {
    var recentEdit = this.dateUpdated === null ? this.datePosted : this.dateUpdated;
    return moment(recentEdit).format('MMMM Do YYYY, h:mm a');
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
