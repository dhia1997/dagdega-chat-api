import mongoose from 'mongoose';

class Connection {
  constructor() {
    // connecting to DB
    mongoose
      .connect('mongodb://dhia:toor12@ds217799.mlab.com:17799/dagdega-chat', {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => console.log('connection successful'))
      .catch(err => console.error(err));
  }
}

export default new Connection();
