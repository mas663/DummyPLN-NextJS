"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, Badge, Space, Input, Button, Typography, Spin } from "antd";
import { UserOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";

const { Text, Title } = Typography;
const { TextArea } = Input;

type ChatMessageProps = {
  sender: "ai" | "user";
  text: string;
  timestamp: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  text,
  timestamp,
}) => {
  const isAI = sender === "ai";

  const bubbleStyle: React.CSSProperties = {
    background: isAI ? "#f0f5ff" : "#f5f5f5",
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "70%",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: isAI ? "flex-start" : "flex-end",
    marginBottom: "15px",
    gap: "10px",
  };

  const avatar = isAI ? (
    <Avatar
      style={{ backgroundColor: "#722ed1", width: 80 }}
      icon={<MessageOutlined />}
    />
  ) : (
    <Avatar icon={<UserOutlined />} />
  );

  return (
    <div style={containerStyle}>
      {isAI && avatar}
      <Space direction="vertical" align={isAI ? "start" : "end"}>
        <div style={bubbleStyle}>
          <Text>{text}</Text>
        </div>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          {timestamp}
        </Text>
      </Space>
      {!isAI && avatar}
    </div>
  );
};

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  loading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSendMessage(value);
      setValue("");
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        borderTop: "1px solid #f0f0f0",
        background: "#fff",
      }}
    >
      <Space.Compact style={{ width: "100%" }}>
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tanyakan tentang data HR, analisis performa, atau insights lainnya..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={loading}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
        />
      </Space.Compact>
      <Text
        type="secondary"
        style={{ fontSize: "12px", marginTop: "8px", display: "block" }}
      >
        Tekan Enter untuk mengirim, Shift-Enter untuk baris baru
      </Text>
    </div>
  );
};

const initialMessages: ChatMessageProps[] = [
  {
    sender: "ai",
    text: "Halo! Saya HC Analytics AI Assistant. Saya dapat membantu Anda menganalisis data SDM, memberikan insights tentang performa karyawan, tingkat kepuasan, turnover rate, dan berbagai metrik HR lainnya. Anda juga bisa upload PDF untuk analisis lebih mendalam. Apa yang ingin Anda ketahui hari ini?",
    timestamp: "10:30",
  },
];

const quickReplies = [
  "Analisis turnover rate 6 bulan terakhir",
  "Departemen mana yang paling produktif?",
  "Prediksi kebutuhan rekrutmen",
  "Tingkat kepuasan karyawan terkini",
];

export default function HCAnalyticsAIPage() {
  const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = (message: string) => {
    const userMessage: ChatMessageProps = {
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const aiResponse: ChatMessageProps = {
        sender: "ai",
        text: "Berdasarkan data terkini, tingkat absensi bulan ini adalah 6.3% (78 dari 1,234 karyawan). Ini menurun 1.2% dibanding bulan sebelumnya. Departemen IT memiliki tingkat absensi terendah (4.1%), sementara Marketing tertinggi (8.7%). Apakah Anda ingin analisis lebih mendalam untuk departemen tertentu?",
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 2000);
  };

  return (
    <MainLayout>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
            background: "#fff",
          }}
        >
          <Space align="center">
            <Avatar
              style={{ backgroundColor: "#722ed1" }}
              icon={<MessageOutlined />}
            />
            <div>
              <Title level={4} style={{ margin: 0 }}>
                HC Analytics AI Agent
              </Title>
              <Text type="secondary">
                AI Assistant untuk Analisis Human Capital
              </Text>
            </div>
          </Space>
          <Badge status="success" text="Online" />
        </div>

        <div
          ref={chatAreaRef}
          style={{ flex: 1, padding: "24px", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <ChatMessage key={index} {...msg} />
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Spin />
            </div>
          )}
        </div>

        <div style={{ padding: "0 24px 16px", background: "#fff" }}>
          <Text type="secondary">Pertanyaan cepat:</Text>
          <br />
          <Space wrap style={{ marginTop: "8px" }}>
            {quickReplies.map((text, index) => (
              <Button
                key={index}
                type="dashed"
                onClick={() => handleSendMessage(text)}
              >
                {text}
              </Button>
            ))}
          </Space>
        </div>

        <ChatInput onSendMessage={handleSendMessage} loading={loading} />
      </div>
    </MainLayout>
  );
}
