// lib/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from './db';

// 定义处理程序的类型
type Handler = (req: NextRequest) => Promise<NextResponse>;

export const withDB = (handler: Handler) => async (req: NextRequest): Promise<NextResponse> => {
  await connectDB(); // 确保数据库连接
  return handler(req); // 调用传入的处理函数
};
