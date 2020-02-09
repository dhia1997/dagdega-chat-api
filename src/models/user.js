import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;
class User {
  initSchema() {
    const schema = new Schema(
      {
        username: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'normal'], default: 'normal' }
      },
      { timestamps: true }
    );
    schema.pre(
      'save',
      function(next) {
        let user = this;
        if (!user.isModified('password')) {
          return next();
        }
        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);

          // hash the password using our new salt
          bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
          });
        });
      },
      function(err) {
        next(err);
      }
    );
    mongoose.model('users', schema);
  }
  // // comparing password
  // comparePassword(candidatePassword, cb) {
  //   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
  //     if (err) {
  //       return cb(err);
  //     }
  //     cb(null, isMatch);
  //   });
  // }
  getInstance() {
    this.initSchema();
    return mongoose.model('users');
  }
}

export default User;
