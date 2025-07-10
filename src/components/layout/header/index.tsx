"use client";

import React, { useState } from "react";
import { Layout, Avatar, Badge, Space, Popover } from "antd";
import {
  UserOutlined,
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Notifications from "@/components/ui/notifications";
import CalendarPopover from "@/components/ui/calendar";
import ProfilePopover from "@/components/ui/profil";

const { Header } = Layout;

const userProfile = {
  name: "Ahmad Wijaya",
  employeeId: "EMP001",
  role: "HR Manager",
  avatarUrl: "https://i.pravatar.cc/150?u=ahmadwijaya",
};

type AppHeaderProps = {
  siderWidth: number;
  notificationsVisible: boolean;
  setNotificationsVisible: (visible: boolean) => void;
  calendarVisible: boolean;
  setCalendarVisible: (visible: boolean) => void;
};

const AppHeader = ({
  siderWidth,
  notificationsVisible,
  setNotificationsVisible,
  calendarVisible,
  setCalendarVisible,
}: AppHeaderProps) => {
  const [profileVisible, setProfileVisible] = useState(false);
  return (
    <Header
      style={{
        padding: "0 24px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "1px solid #f0f0f0",
        position: "fixed",
        top: 0,
        zIndex: 10,
        left: siderWidth,
        width: `calc(100% - ${siderWidth}px)`,
        transition: "all 0.2s",
      }}
    >
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
            <ProfilePopover
              name={userProfile.name}
              role={userProfile.role}
              employeeId={userProfile.employeeId}
              avatarUrl={userProfile.avatarUrl}
              onClose={() => setProfileVisible(false)}
            />
          }
          trigger="click"
          open={profileVisible}
          onOpenChange={setProfileVisible}
          placement="bottomRight"
        >
          <Avatar
            icon={<UserOutlined />}
            src={userProfile.avatarUrl}
            style={{ cursor: "pointer" }}
          />
        </Popover>
      </Space>
    </Header>
  );
};

export default AppHeader;
