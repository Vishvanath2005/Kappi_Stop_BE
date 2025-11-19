const mongoose = require("mongoose");

require("dotenv").config()
const MongoDBurl =process.env.MongoDbURL

const connectDB = async () => {
  try {
    const connectedDB = await mongoose.connect(
    `${MongoDBurl}`
    );
    console.log(`DB is Connected`);
  } catch (error) {
    console.log("DB is not connected");
    process.exit(1);
  }
};

module.exports = connectDB