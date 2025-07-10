"use client";

import React from "react";
import { Avatar, Button, Space, Typography, Divider, Tag } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

type ProfilePopoverProps = {
  name: string;
  employeeId: string;
  role: string;
  avatarUrl: string;
  onClose: () => void;
};

const ProfilePopover = ({
  name,
  employeeId,
  role,
  avatarUrl,
  onClose,
}: ProfilePopoverProps) => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logout clicked!");
    onClose();
    router.push("/");
  };

  return (
    <div style={{ width: 280 }}>
      <Space>
        <Avatar size="large" src={avatarUrl} icon={<UserOutlined />} />
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {name}
          </Title>
          <Text type="secondary">{role}</Text>
          <br />
          <Tag color="blue" style={{ marginTop: "8px" }}>
            {employeeId}
          </Tag>{" "}
        </div>
      </Space>

      <Divider style={{ margin: "12px 0" }} />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Link href="/profile" passHref>
          <Button
            type="text"
            icon={<ProfileOutlined />}
            block
            style={{ textAlign: "left", height: "auto", padding: "8px 12px" }}
            onClick={onClose}
          >
            Lihat Profil Lengkap
          </Button>
        </Link>
        <Button
          danger
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          block
          style={{ textAlign: "left", height: "auto", padding: "8px 12px" }}
        >
          Logout
        </Button>
      </Space>
    </div>
  );
};

export default ProfilePopover;
