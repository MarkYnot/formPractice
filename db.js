const db = "mongodb+srv://Ally123:Ally123@ins-clone.pmemssv.mongodb.net/course";
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
