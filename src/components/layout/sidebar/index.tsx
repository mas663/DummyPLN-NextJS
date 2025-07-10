"use client";

import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: <Link href="/home">Home</Link>,
  },
  {
    key: "/data-dashboard",
    icon: <DashboardOutlined />,
    label: <Link href="/data-dashboard">Data Dashboard</Link>,
  },
  {
    key: "/hc-analytics-ai",
    icon: <BarChartOutlined />,
    label: <Link href="/hc-analytics-ai">HC Analytics AI</Link>,
  },
  {
    key: "/products",
    icon: <ShopOutlined />,
    label: <Link href="/products">products</Link>,
  },
  {
    key: "/profile",
    icon: <UserOutlined />,
    label: <Link href="/profile">Profile</Link>,
  },
];

type SidebarProps = {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={250}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "16px 24px",
        }}
      >
        <Image
          src="/assets/images/pln-logo.png"
          alt="PLN Logo"
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
        />
        {!collapsed && (
          <Title
            level={4}
            style={{
              margin: "0 0 0 12px",
              color: "#003366",
              whiteSpace: "nowrap",
            }}
          ></Title>
        )}
      </div>
      <Menu
        theme="light"
        selectedKeys={[pathname ?? ""]}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
