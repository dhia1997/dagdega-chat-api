import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
// import slugify from 'slugify';

class Message {
  initSchema() {
    const schema = new Schema(
      {
        auhtor: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true
        },
        // slug: String, // can be used for the links only for posts so we dont't use this here
        content: {
          type: String,
          required: true
        }
      },
      { timestamps: true }
    );
    schema.pre(
      'save',
      function(next) {
        let message = this;
        if (!message.isModified('author')) {
          return next();
        }
        // post.slug = slugify(post.title, '_');
        // console.log('set slug', post.slug);
        // return next();
      },
      function(err) {
        next(err);
      }
    );
    schema.plugin(uniqueValidator);
    mongoose.model('messages', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('messages');
  }
}

export default Message;
