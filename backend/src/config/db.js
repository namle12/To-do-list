import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("liên kết DB thành công");
  } catch (error) {
    console.error("lỗi khi kết DB thất bại :", error);
    process.exit(1);
  }
};
