const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Mongo db connected");
  } catch (error) {
    console.error("error connecting to mongodb", error);
    process.exit(1);
  }
};


module.exports = connectDB;
