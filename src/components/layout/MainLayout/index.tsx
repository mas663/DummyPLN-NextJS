"use client";

import React, { useState } from "react";
import { Layout } from "antd";
import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import AppFooter from "@/components/layout/footer";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const siderWidth = collapsed ? 80 : 250;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout
        style={{ marginLeft: siderWidth, transition: "margin-left 0.2s" }}
      >
        <AppHeader
          siderWidth={siderWidth}
          notificationsVisible={notificationsVisible}
          setNotificationsVisible={setNotificationsVisible}
          calendarVisible={calendarVisible}
          setCalendarVisible={setCalendarVisible}
        />
        <Content
          style={{
            marginTop: "64px",
            padding: "24px 16px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              padding: 24,
              background: "#fff",
              borderRadius: 8,
              minHeight: "calc(100vh - 180px)",
            }}
          >
            {children}
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
