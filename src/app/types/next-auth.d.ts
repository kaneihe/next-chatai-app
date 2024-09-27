import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;  // 添加 id 属性
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

