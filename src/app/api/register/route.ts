import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { withDB } from "@/lib/middleware";


export const POST = withDB(
  async (request: NextRequest): Promise<NextResponse> => {
    const { email, password } = await request.json();

    // 检查用户是否已经存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "email already exists",
      });
    }

    // 注册时不手动加密 
    const newUser = new User({ email, password });
    await newUser.save();
    
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  }
);
