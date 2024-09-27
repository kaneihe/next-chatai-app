// app/api/message/route.ts
import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/Message"; // Message 模型
import { withDB } from "@/lib/middleware";


export const POST = withDB(async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { sender, receiver, message } = await req.json();
    console.log(sender, receiver, message);
    // 简单验证
    if (!sender || !receiver || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 保存消息到数据库
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to connect to the database" },
      { status: 500 }
    );
  }
});

export const GET = withDB(async (req: NextRequest): Promise<NextResponse> => {
  // 从查询参数获取 sender 和 receiver
  const { searchParams } = new URL(req.url);
  const sender = searchParams.get("sender");
  const receiver = searchParams.get("receiver");

  if (!sender || !receiver) {
    return NextResponse.json(
      { error: "Missing sender or receiver" },
      { status: 400 }
    );
  };

  try {
    // 获取 sender 和 receiver 之间的所有消息，按 timestamp 排序
    const messages = await Message.find({ 
      $or: [
        {sender: sender, receiver: receiver },
        {sender: receiver, receiver: sender },
      ]}
      ).sort({timestamp: 1});
    console.log('message = ', messages);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 } 
    );
  }
});
