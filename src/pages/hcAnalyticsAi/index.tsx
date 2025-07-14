"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Typography, Spin, Input, Avatar } from "antd";
import {
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";
import ChatHistoryDrawer from "@/components/ui/chatHistory";
import { Message, Chat } from "@/types/chat";

const { Title, Paragraph } = Typography;

const templatePrompts = [
  "Berikan ringkasan kinerja karyawan bulan ini.",
  "Apa rencana rekrutmen untuk kuartal depan?",
  "Sebutkan program pelatihan yang paling mendesak.",
];

export default function HcAnalyticsAiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [historyDrawerVisible, setHistoryDrawerVisible] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0 || localStorage.getItem("chatHistory")) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateHistory = (chatId: string, newMessages: Message[]) => {
    const existingChatIndex = chatHistory.findIndex(
      (chat) => chat.id === chatId
    );
    let updatedHistory = [...chatHistory];

    if (existingChatIndex !== -1) {
      updatedHistory[existingChatIndex].messages = newMessages;
    } else {
      const newChat: Chat = {
        id: chatId,
        title: newMessages[0].content.substring(0, 40) + "...",
        messages: newMessages,
      };
      updatedHistory = [newChat, ...updatedHistory];
    }
    setChatHistory(updatedHistory);
  };

  const handleSendMessage = async (prompt: string) => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setInputValue("");

    const userMessage: Message = { role: "user", content: prompt };
    let currentChatId = activeChatId;
    const newMessages = [...messages, userMessage];

    if (!currentChatId) {
      currentChatId = Date.now().toString();
      setActiveChatId(currentChatId);
      updateHistory(currentChatId, [userMessage]);
    } else {
      updateHistory(currentChatId, newMessages);
    }

    setMessages(newMessages);

    try {
      const response = await fetch("/api/hcAiStream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.body) throw new Error("Streaming not supported.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiFullResponse = "";

      const aiPlaceholder: Message = { role: "ai", content: "" };
      setMessages([...newMessages, aiPlaceholder]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6).trim();
            if (data === "[DONE]") {
              const finalAiMessage: Message = {
                role: "ai",
                content: aiFullResponse,
              };
              updateHistory(currentChatId, [...newMessages, finalAiMessage]);
              setIsLoading(false);
              return;
            }
            aiFullResponse += data + " ";
            setMessages((prev) => {
              const updatedMsgs = [...prev];
              updatedMsgs[updatedMsgs.length - 1].content = aiFullResponse;
              return updatedMsgs;
            });
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadChat = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setActiveChatId(chat.id);
      setMessages(chat.messages);
      setHistoryDrawerVisible(false);
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setHistoryDrawerVisible(false);
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedHistory = chatHistory.filter((c) => c.id !== chatId);
    setChatHistory(updatedHistory);
    if (activeChatId === chatId) {
      handleNewChat();
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Button
          icon={<HistoryOutlined />}
          onClick={() => setHistoryDrawerVisible(true)}
        >
          Riwayat
        </Button>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 && !isLoading ? (
            <div className="welcome-screen">
              <Title level={3}>Mulai Percakapan</Title>
              <Paragraph type="secondary">
                Ajukan pertanyaan atau pilih dari template di bawah.
              </Paragraph>
              <div className="template-prompts">
                {templatePrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    className="prompt-button"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <Avatar
                  icon={
                    msg.role === "user" ? <UserOutlined /> : <RobotOutlined />
                  }
                  className="avatar"
                />
                <div className="message-content">
                  <Paragraph style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                    {msg.content}
                    {isLoading && index === messages.length - 1 && (
                      <span className="blinking-cursor">▋</span>
                    )}
                  </Paragraph>
                </div>
              </div>
            ))
          )}
          {isLoading && messages.length === 0 && <Spin />}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ketik pertanyaan Anda di sini..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputValue);
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => handleSendMessage(inputValue)}
            loading={isLoading}
          />
        </div>
      </div>

      <ChatHistoryDrawer
        visible={historyDrawerVisible}
        onClose={() => setHistoryDrawerVisible(false)}
        history={chatHistory}
        onLoadChat={handleLoadChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      <style jsx global>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 250px);
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          background: #fff;
        }
        .chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
        }
        .welcome-screen {
          text-align: center;
          padding-top: 50px;
        }
        .template-prompts {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 500px;
          margin: 24px auto 0;
        }
        .prompt-button {
          text-align: left;
          height: auto;
          padding: 12px 16px;
          white-space: normal;
        }
        .message {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .message.user {
          justify-content: flex-end;
        }
        .message.user .message-content {
          background-color: #1677ff;
          color: white;
          border-radius: 18px 18px 4px 18px;
        }
        .message.ai .message-content {
          background-color: #f5f5f5;
          border-radius: 18px 18px 18px 4px;
        }
        .message.user .avatar {
          order: 2;
        }
        .message-content {
          padding: 12px 16px;
          max-width: 75%;
        }
        .chat-input-area {
          display: flex;
          gap: 8px;
          padding: 16px;
          border-top: 1px solid #f0f0f0;
        }
        .blinking-cursor {
          font-weight: bold;
          animation: blink 1s step-start 0s infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </MainLayout>
  );
}
