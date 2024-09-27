import { NextApiRequest, NextApiResponse } from 'next';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import Message from '@/models/Message';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HttpServer & {
      io?: SocketIOServer;
    };
  };
};

// 导出一个处理 API 请求的默认函数
export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  // 检查响应对象的服务器是否已关联一个 Socket.IO 实例
  if (!res.socket.server.io) {
    console.log('Initializing new Socket.IO server...');

    // 创建 Socket.IO 服务器并将其附加到 HTTP 服务器
    const io = new SocketIOServer(res.socket.server, {
      path: '/api/socket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    
    // 监听客户端连接事件
    io.on('connection', (socket) => {
      // 监听消息事件, 并保存到数据库
      socket.on('message', async (data) => {
        try {
          // 保存消息到数据库
          const newMessage = new Message({
            sender: data.sender,
            receiver: data.receiver,
            message: data.message,
            timestamp: new Date(),
          });

          await newMessage.save();

          // 将消息广播给所有客户端
          io.emit('message', data);
        } catch (error) {
          console.error('Error saving message to MongoDB:', error);
        }
      });

      // 监听断开连接事件
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    // 将 io 附加到服务器实例，防止多次初始化
    res.socket.server.io = io;
  } else {
    console.log('Socket.IO server already running');
  }

  // 结束响应
  res.end();
}
