import { withDB } from '@/lib/middleware';
import { fetchUserByEmail } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';


// API 路由处理（如 POST 请求）实际上是在服务器端执行的
// Next.js 的 API 路由是由 Node.js 服务器运行的
export const POST = withDB( async (request: NextRequest): Promise<NextResponse> => {
    const { email, password } = await request.json();
    console.log('username = ', email, password)
    // 验证逻辑
    const user = await fetchUserByEmail(email);
    if ( !user || !user.comparePassword(password)) {
        return NextResponse.json({ success: true, message: 'Login successful' });
    } else {
        return NextResponse.json({ success: false, message: 'Invalid credentials' });
    }
});
