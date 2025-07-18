"use client";

import React, { useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { useRouter, usePathname } from "next/navigation";
import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import AppFooter from "@/components/layout/footer";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const siderWidth = collapsed ? 80 : 250;

  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/");
    } else {
      setIsVerified(true);
    }
  }, [router]);

  const getPageTitle = () => {
    switch (pathname) {
      case "/home":
        return "Home";
      case "/data-dashboard":
        return "Data Dashboard";
      case "/hc-analytics-ai":
        return "HC Analytics AI";
      case "/products":
        return "Manajemen Produk";
      case "/profile":
        return "Profil Pengguna";
      default:
        return "Dashboard";
    }
  };

  if (!isVerified) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

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
          title={getPageTitle()}
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
