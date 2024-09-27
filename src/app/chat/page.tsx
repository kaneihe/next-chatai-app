"use client";

import React, { useState, useEffect, useRef } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { io } from "socket.io-client";
import { Message, User } from "@/lib/types";
import Modal from "@/components/modal/modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./loading";


const url = process.env.NODE_ENV === "production" ? process.env.VERCEL_URL : process.env.NEXTAUTH_URL || "http://localhost:3000";

// 创建一个 Socket.IO 客户端实例
const socket = io(url!, { path: "/api/socket" });

const Chat = () => {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sender, setSender] = useState<string>(""); // 当前登录的用户
  const [selectedUser, setSelectedUser] = useState<User>(); // 当前选中的用户
  const [users, setUsers] = useState<User[]>([]); // 所有用户列表
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]); // 存储成员列表

  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 获取登录用户的 email
  useEffect(() => {
    if (status === "loading") {
      // 当 status 为 "loading" 时，不执行任何操作
      return;
    }
    if (status === "authenticated") {
      setSender(session.user.email ?? "");
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  // 监听 socket 消息
  useEffect(() => {    
    socket.on("connect", () => {
      console.log("Client Connected to the server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    socket.on("error", (error) => {
      console.error("Socket Error:", error);
    });

    // 监听来自服务器发送的消息
    socket.on("message", (data) => {
      if (
        (data.sender === sender &&
          data.receiver === selectedUser?.email) ||
        (data.sender === selectedUser?.email && data.receiver === sender)
      ) {
        // 将消息显示在聊天窗口
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off("message"); // 清理监听器
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [sender, selectedUser]);

  // 获取用户列表
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");

        // 将用户列表保存到 state
        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // 获取聊天消息
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        try {
          const response = await axios.get(
            `/api/message?sender=${sender}&receiver=${selectedUser.email}`
          );
          setMessages(response.data.messages);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedUser, sender]);


  useEffect(() => {
    setTimeout(() => {
      // 滚动到底部
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      sender: sender, // 发送者（可以通过登录系统获取）
      receiver: selectedUser?.email ? selectedUser.email : "", // 接收者（可以是聊天对方）
      message: message,
      timestamp: new Date().toISOString(),
    };
    
    socket.emit("message", data, (ack: { error: string; }) => {
      if (ack.error) {
        console.error("Message send error:", ack.error);
      } else {
        console.log("Message sent successfully");
      }
    });
    setMessage(""); // 清空输入框
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMember = () => {
    if (newMemberEmail.trim()) {
      setMembers([...members, newMemberEmail]);
      setNewMemberEmail(""); // 清空输入框
      handleCloseModal(); // 关闭Modal
    }
  };

  const formatDate = (date: Date) => {
    const localDate = new Date(date); // 自动转换为本地时区
    // 获取本地小时和分钟，并确保它们是两位数格式
    const localHours = String(localDate.getHours()).padStart(2, "0"); // 获取本地小时
    const localMinutes = String(localDate.getMinutes()).padStart(2, "0"); // 获取本地分钟

    const localTime = `${localHours}:${localMinutes}`; // 格式化为 "hh:mm"
    return localTime;
  };

  // 显示 Loading 组件，当 session 处于 loading 状态时
  if (status === "loading") {
    return <Loading />; // 在这里显示 Loading    
  }

  const userList = users.filter((user) => user.email !== sender); 

  return (
    <main className="lg:pl-20 h-screen overflow-hidden">
      <div className="h-full flex">
        {/* 左侧用户列表 */}
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 hidden">
          <div className="px-5">
            <div className="flex justify-between mb-4 py-4 border-b">
              <div className="text-2xl font-bold text-neutral-800">
                Available Users
              </div>
              <div
                onClick={() => setIsModalOpen(true)}
                title="Create a group chat"
                className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
              >
                <GroupAddIcon color={"primary"} />
              </div>
            </div>
            <div className="w-full relative flex flex-col">
              {userList.map((user) => (
                <div
                  key={user.email}
                  onClick={() => setSelectedUser(user)}
                  className="items-start space-x-3 space-y-3 my-2 hover:bg-blue-300 rounded-lg transition cursor-pointer p-3 bg-neutral-100"
                >
                  {user.email}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 右侧聊天窗口 */}
        <div className="lg:pl-80 flex-1 flex flex-col h-screen">
          {/* header */}
          <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-4 px-4 lg:px-6 justify-between items-center shadow-sm">
            {selectedUser ? (
              <div className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <h2>Chat with {selectedUser.email}</h2>
                  <div className="text-sm font-light text-neutral-500">
                    Online
                  </div>
                </div>
              </div>
            ) : (
              <h3>Select a user to start chatting</h3>
            )}
          </div>

          {/* body (消息列表) */}
          <div className="flex-1 overflow-y-auto bg-gray-100">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.sender === sender
                    ? "flex gap-3 p-4 justify-end"
                    : "flex gap-3 p-4 justify-start"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                      {msg.sender.split("@")[0]}:
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(msg.timestamp)}
                    </div>
                  </div>
                  <div
                    className={`${
                      msg.sender === sender
                        ? "text-sm w-fit overflow-hidden bg-green-400 text-black rounded-xl py-2 px-3"
                        : "text-sm w-fit overflow-hidden bg-teal-300 rounded-xl py-2 px-3"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* footer (输入框) */}
          <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 lg:gap-4 w-full"
            >
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 通用Modal，传递特定内容 */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="添加聊天成员"
        content={
          <TextField
            autoFocus
            margin="dense"
            label="成员 Email"
            type="email"
            fullWidth
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
          />
        }
        actions={
          <>
            <Button onClick={handleCloseModal}>取消</Button>
            <Button onClick={handleAddMember} color="primary">
              添加
            </Button>
          </>
        }
      />
    </main>
  );
};

export default Chat;
