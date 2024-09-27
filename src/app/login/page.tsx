"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";
import AuthSocialButton from "@/components/auth/authButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: true,  // 阻止默认的重定向
        email,
        password,
      });

      if(!res?.error){
        // 跳转到 Chat 页面
        // router.push("/chat");
      } else {
        setError(res?.error || "Login failed");
      }
    } catch (e) {
      console.error("Login Error:", e);
      setError("An error occurred while logging in. Please try again.");
    }
  };  

  return (
    <div className="bg-gray-100 p-10">
      <div className="sm:mx-auto flex flex-col justify-center h-full sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          className="mx-auto w-auto"
          height={64}
          width={64}
          src="/images/logo.png"
        />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
          Join AI Chat Today!
        </h2>
      </div>

      <div className="flex items-baseline justify-center mt-4 min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </form>          

          {/* Social Login Buttons */}
          <article className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={GitHubIcon}
                onClick={() => signIn("github")}
              />
              <AuthSocialButton
                icon={GoogleIcon}
                onClick={() => signIn("google")}
              />
              <AuthSocialButton
                icon={TwitterIcon}
                onClick={() => signIn("twitter")}
              />
            </div>
          </article>

          <div className="text-center text-sm">
            {`Don't have an account?`}
            <button onClick={() => router.push("/register")}>
              <p className="mx-2 underline text-blue-500 hover:bg-gray-200">
                Register
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
