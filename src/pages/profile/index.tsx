import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  IdcardOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const userProfile = {
  name: "Ahmad Wijaya",
  employeeId: "EMP001",
  role: "HR Manager",
  avatarUrl: "https://i.pravatar.cc/150?u=ahmadwijaya",
  email: "ahmad.wijaya@company.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
  department: "Human Resources",
  joinDate: "15 Januari 2023",
  manager: "Sarah Abdullah",
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div>
    <Space align="start">
      <Text type="secondary" style={{ fontSize: 16 }}>
        {icon}
      </Text>
      <div>
        <Text type="secondary">{label}</Text>
        <br />
        <Text strong>{value}</Text>
      </div>
    </Space>
  </div>
);

const ProfilePage = () => {
  return (
    <MainLayout>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>User Profile</Title>
        <Text type="secondary">Kelola informasi profil Anda</Text>
      </div>

      <Card
        bordered={false}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Space size={20} align="center">
            <Avatar
              size={80}
              src={userProfile.avatarUrl}
              icon={<UserOutlined />}
            />
            <div>
              <Title level={3} style={{ marginBottom: 0 }}>
                {userProfile.name}
              </Title>
              <Text type="secondary">{userProfile.role}</Text>
              <br />
              <Tag color="blue" style={{ marginTop: "8px" }}>
                {userProfile.employeeId}
              </Tag>
            </div>
          </Space>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Profil
          </Button>
        </div>

        <Divider />

        <Row gutter={[32, 24]}>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<IdcardOutlined />}
              label="Nama Lengkap"
              value={userProfile.name}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<MailOutlined />}
              label="Email"
              value={userProfile.email}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<PhoneOutlined />}
              label="Nomor Telepon"
              value={userProfile.phone}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<EnvironmentOutlined />}
              label="Lokasi"
              value={userProfile.location}
            />
          </Col>
        </Row>

        <Divider />

        <Title level={5} style={{ marginBottom: "24px" }}>
          Informasi Pekerjaan
        </Title>
        <Row gutter={[32, 24]}>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<TeamOutlined />}
              label="Department"
              value={userProfile.department}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<IdcardOutlined />}
              label="Role"
              value={userProfile.role}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<CalendarOutlined />}
              label="Tanggal Bergabung"
              value={userProfile.joinDate}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InfoItem
              icon={<UserOutlined />}
              label="Manager"
              value={userProfile.manager}
            />
          </Col>
        </Row>
      </Card>
    </MainLayout>
  );
};

export default ProfilePage;
