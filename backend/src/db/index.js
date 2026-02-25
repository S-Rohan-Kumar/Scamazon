import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectioninsatnce = await mongoose.connect(`${process.env.MONGO_URL}/scamazon`);
    console.log(
      `✔️ Mongo DB connected | DB host: ${connectioninsatnce.connection.host}`,
    );
  } catch (error) {
    console.log("❌ Mongoose connection failed !", error);
    process.exit(1);
  }
};

export default connectDB;
