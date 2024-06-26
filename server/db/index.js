import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectdb;