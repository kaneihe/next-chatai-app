import { withDB } from "@/lib/middleware";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = withDB(async (): Promise<NextResponse> => {  
    try {
      // 获取所有消息
      const users = await User.find();
      
      return NextResponse.json({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 } 
      );
    }
  });
  