import mongoose from "mongoose";
const connectDb = async () => {
  try {
    awaitmongooseconnect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex:true
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDb;
