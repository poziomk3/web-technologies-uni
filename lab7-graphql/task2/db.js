import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/graphqlDB";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB");
  } catch (error) {
    process.exit(1);
  }
};
