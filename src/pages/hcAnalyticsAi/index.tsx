"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Card, Typography, Space, Spin, Input, Avatar } from "antd";
import { SendOutlined, UserOutlined, RobotOutlined } from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";

const { Title, Paragraph } = Typography;

// Tipe untuk setiap pesan dalam chat
type Message = {
  role: "user" | "ai";
  content: string;
};

const templatePrompts = [
  "Berikan ringkasan kinerja karyawan bulan ini.",
  "Apa rencana rekrutmen untuk kuartal depan?",
  "Sebutkan program pelatihan yang paling mendesak.",
];

export default function HcAnalyticsAiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Efek untuk auto-scroll ke pesan terbaru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (prompt: string) => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setInputValue("");

    // Tambahkan pesan user dan placeholder untuk AI
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: prompt },
      { role: "ai", content: "" }, // Placeholder AI
    ];
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

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6).trim();
            if (data === "[DONE]") {
              setIsLoading(false);
              return;
            }
            // DIUBAH: Tambahkan spasi setelah setiap kata
            setMessages((prev) => {
              const updatedMessages = [...prev];
              updatedMessages[updatedMessages.length - 1].content += data + " ";
              return updatedMessages;
            });
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].content =
          "Terjadi kesalahan saat mengambil data.";
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Title level={2}>HC Analytics AI</Title>
      <Paragraph type="secondary">
        Ajukan pertanyaan atau pilih dari template di bawah untuk memulai
        percakapan dengan AI.
      </Paragraph>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 && !isLoading ? (
            <Card>
              <Title level={4}>Contoh Pertanyaan</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                {templatePrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    block
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </Space>
            </Card>
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
                  <Paragraph style={{ whiteSpace: "pre-wrap" }}>
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

      <style jsx global>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 280px);
          border: 1px solid #f0f0f0;
          border-radius: 8px;
        }
        .chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
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
          background-color: #e6f7ff;
          border-radius: 12px 12px 0 12px;
        }
        .message.ai .message-content {
          background-color: #f5f5f5;
          border-radius: 12px 12px 12px 0;
        }
        .message.user .avatar {
          order: 2;
        }
        .message-content {
          padding: 12px 16px;
          max-width: 70%;
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
