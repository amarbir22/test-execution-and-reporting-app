const mongoose = require('mongoose');
// DB Config
const db = require('./keys').mongoURI;

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to db', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
