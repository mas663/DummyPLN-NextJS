"use client";

import React from "react";
import { Drawer, Button, List, Popconfirm, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Chat } from "@/types/chat";

type ChatHistoryDrawerProps = {
  visible: boolean;
  onClose: () => void;
  history: Chat[];
  onLoadChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
};

const ChatHistoryDrawer = ({
  visible,
  onClose,
  history,
  onLoadChat,
  onNewChat,
  onDeleteChat,
}: ChatHistoryDrawerProps) => {
  return (
    <Drawer
      title="Riwayat Percakapan"
      placement="right"
      onClose={onClose}
      open={visible}
      width={350}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onNewChat}
        style={{ marginBottom: 24, width: "100%" }}
      >
        Mulai Percakapan Baru
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={history}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                key="delete"
                title="Hapus percakapan ini?"
                onConfirm={() => {
                  onDeleteChat(item.id);
                  message.success("Riwayat berhasil dihapus.");
                }}
                okText="Ya"
                cancelText="Tidak"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<MessageOutlined />}
              title={
                <a
                  onClick={() => {
                    onLoadChat(item.id);
                  }}
                >
                  {item.title}
                </a>
              }
              description={`${item.messages.length} pesan`}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default ChatHistoryDrawer;
