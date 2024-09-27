import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    // 发送者的用户ID
    sender: {
        type: String,
        required: true
    },
    // 接收者的用户ID
    receiver: {
        type: String,
        required: true
    },
    // 加密后的信息内容
    message: {
        type: String,
        required: true
    },
    // 消息发送时间
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// 检查是否已经存在 'Message' 模型，避免重复定义
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
