import mongoose, { Schema } from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';
// import slugify from 'slugify';

class Message {
  initSchema() {
    const schema = new Schema(
      {
        author: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true
        },
        // slug: String, // can be used for the links only for posts so we dont't use this here
        content: {
          type: String,
          required: true
        },
        seenBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }] // user had seen the message
      },
      { timestamps: true }
    );
    // schema.pre(
    //   'save',
    //   function(next) {
    //     let message = this;
    //     if (!message.isModified('author')) {
    //       return next();
    //     }
    //   },
    //   function(err) {
    //     next(err);
    //   }
    // );
    // schema.plugin(uniqueValidator);
    mongoose.model('messages', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('messages');
  }
}

export default Message;
