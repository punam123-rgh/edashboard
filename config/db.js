const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI
      
    );
    console.log('mongodb connected');
  } catch (error) {
    console.error('DB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;