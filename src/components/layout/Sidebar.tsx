"use client";

import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import plnLogo from "../../../public/assets/images/pln-logo.png";

const { Sider } = Layout;

const menuItems = [
  {
    key: "/dashboard",
    icon: <HomeOutlined />,
    label: <Link href="/dashboard">Home</Link>,
  },
  {
    key: "/data-dashboard",
    icon: <DashboardOutlined />,
    label: <Link href="#">Data Dashboard</Link>,
  },
  {
    key: "/hc-analytics-ai",
    icon: <BarChartOutlined />,
    label: <Link href="/hc-analytics-ai">HC Analytics AI</Link>,
  },
  {
    key: "/",
    icon: <UserOutlined />,
    label: <Link href="#">Profile</Link>,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      style={{
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Image src={plnLogo} alt="PLN Logo" width={100} />
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["/dashboard"]}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
