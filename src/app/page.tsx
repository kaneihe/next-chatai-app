'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./components/button/button";


export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert w-[460px] h-auto"
          src="images/chatBot-logo.svg"
          alt="ChatBot logo"
          width={340}
          height={80}
          priority
        />
        <div className="ml-4 list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <div className="my-5 text-3xl font-sans font-extrabold">
            Start a conversation with AI
          </div> 
          <div className="my-6 mx-2">
            <p className="my-2">AI: Hello! How can I assist you today?</p>
            <p>You: Tell me about ChatGPT!</p>
          </div>
        </div>

        <div className="flex gap-4 items-center ml-8 flex-col sm:flex-row">
         <Button 
          className="rounded-full transition-colors flex justify-center text-sm sm:text-base h-10 sm:h-12 px-7"
          onClick={()=>router.push('/login')}
         >
          Login now
        </Button>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/register"
            rel="noopener noreferrer"
          >
            Register
          </Link>
        </div>
      </main>      
    </div>
  );
}
