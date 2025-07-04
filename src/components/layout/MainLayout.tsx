"use client";

import React from "react";
import { Layout, Avatar, Badge, Space } from "antd";
import {
  UserOutlined,
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Sidebar from "@/components/layout/Sidebar";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Space size="large">
            <Badge dot>
              <BellOutlined style={{ fontSize: "18px" }} />
            </Badge>
            <CalendarOutlined style={{ fontSize: "18px" }} />
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Header>
        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MAS ©{new Date().getFullYear()} - Dibuat Oleh Affan
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
