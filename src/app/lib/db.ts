import mongoose from "mongoose";

/**
 * 连接到MongoDB数据库
 * 本函数使用mongoose库尝试连接到配置的MongoDB服务器
 * 使用了环境变量MONGODB_URI来获取数据库连接字符串
 * 同时启用了url解析和统一的顶层拓扑设置
 */
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  const uri = process.env.MONGODB_ATLAS_URI;
  
  if (!uri) {
    throw new Error("Please define the MONGODB_ATLAS_URI environment variable");
  }

  try {
    // 使用mongoose连接到MongoDB数据库
    await mongoose.connect(process.env.MONGODB_ATLAS_URI!, 
    //   {
    //   connectTimeoutMS: 10000,      // 设置连接超时时间为10秒
    //   serverSelectionTimeoutMS: 10000,  // 服务端选择超时时间10秒
    // }
  );    
    
    // 如果连接成功，输出日志信息
    console.log("MongoDB connected");
  } catch (err) {
    // 如果连接失败，输出错误信息并退出应用
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
