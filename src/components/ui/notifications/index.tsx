"use client";

import React from "react";
import { List, Avatar, Typography } from "antd";
import {
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const notificationData = [
  {
    icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
    title: "Evaluasi Kinerja Selesai",
    descriptions: "Evaluasi untuk Ahmad Wijaya telah disetujui",
    time: "5menit yang lalu",
  },
  {
    icon: <WarningOutlined style={{ color: "#faad14" }} />,
    title: "Pelatihan Mendatang",
    descriptions: "Jangan lupa workship leadership akan dimulai besok",
    time: "2jam yang lalu",
  },
  {
    icon: <UserOutlined style={{ color: "#072248" }} />,
    title: "Karyawan Baru Bergabung",
    descriptions: "Evaluasi untuk Ahmad Wijaya telah disetujui",
    time: "5menit yang lalu",
  },
];

const Notifications = () => (
  <List
    itemLayout="horizontal"
    dataSource={notificationData}
    style={{ width: 350 }}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar
              icon={item.icon}
              style={{ backgroundColor: "transparent" }}
            />
          }
          title={<a href="#">{item.title}</a>}
          description={
            <>
              <Text type="secondary">{item.descriptions}</Text>
              <br />
              <Text style={{ fontSize: 12, color: "#bfbfbf" }}>
                {item.time}
              </Text>
            </>
          }
        />
      </List.Item>
    )}
  />
);

export default Notifications;
