"use client";

import React, { useEffect, useState } from "react";
import { Layout, Avatar, Badge, Space, Popover, Typography } from "antd";
import {
  UserOutlined,
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Notifications from "@/components/ui/notifications";
import CalendarPopover from "@/components/ui/calendar";
import ProfilePopover from "@/components/ui/profil";

const { Header } = Layout;
const { Title } = Typography;

type UserData = {
  name: string;
  username: string;
  image: string;
};

type AppHeaderProps = {
  siderWidth: number;
  notificationsVisible: boolean;
  setNotificationsVisible: (visible: boolean) => void;
  calendarVisible: boolean;
  setCalendarVisible: (visible: boolean) => void;
  title: string;
};

const AppHeader = ({
  siderWidth,
  notificationsVisible,
  setNotificationsVisible,
  calendarVisible,
  setCalendarVisible,
  title,
}: AppHeaderProps) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <Header
      style={{
        padding: "0 24px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
        position: "fixed",
        top: 0,
        zIndex: 10,
        left: siderWidth,
        width: `calc(100% - ${siderWidth}px)`,
        transition: "all 0.2s",
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        {title}
      </Title>

      <Space size="large">
        <Popover
          content={<Notifications />}
          title="Notifikasi"
          trigger="click"
          open={notificationsVisible}
          onOpenChange={setNotificationsVisible}
          placement="bottomRight"
        >
          <Badge dot>
            <BellOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
          </Badge>
        </Popover>

        <Popover
          content={<CalendarPopover />}
          trigger="click"
          open={calendarVisible}
          onOpenChange={setCalendarVisible}
          placement="bottomRight"
        >
          <CalendarOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        </Popover>

        <Popover
          content={
            userData ? (
              <ProfilePopover
                name={userData.name}
                role="User"
                employeeId={userData.username}
                avatarUrl={userData.image}
                onClose={() => setProfileVisible(false)}
              />
            ) : null
          }
          trigger="click"
          open={profileVisible}
          onOpenChange={setProfileVisible}
          placement="bottomRight"
        >
          <Avatar
            icon={<UserOutlined />}
            src={userData?.image}
            style={{ cursor: "pointer" }}
          />
        </Popover>
      </Space>
    </Header>
  );
};

export default AppHeader;
