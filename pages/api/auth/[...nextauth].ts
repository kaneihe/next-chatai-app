// pages/api/auth/[...nextauth].ts
import connectDB from "@/lib/db";
import { fetchUserByEmail } from "@/lib/utils";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";


export default NextAuth({
  providers: [
    // 自定义的CredentialsProvider 实现 email + password 登录
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // 确保数据库连接
        await connectDB();

        const { email, password } = credentials!;
        // check if user details are passed
        if (!email || !password) {
          throw new Error("Please enter your credentials");
        }

        // 查找用户
        const user = await fetchUserByEmail(email);

        // 验证用户
        if (!user || !(await user.comparePassword(password))) {
          throw new Error("Invalid email or password");
        }

        // if all checks pass, return user
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      // httpOptions: {
      //   timeout: 30000,
      // },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0", // 使用 Twitter API v2
    }),
  ],

  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login", // 登录页面
  },
  session: {
    strategy: "jwt",
  },
  // 添加其他配置
  secret: process.env.NEXTAUTH_SECRET, // 用于加密 session 的 secret

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;  // 类型断言为字符串
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      // 将用户 ID 持久化到会话
      return session;
    },
    async redirect({ baseUrl }) {
      // 在登录成功后重定向到主页
      return baseUrl + "/chat";
    },
  },
});
