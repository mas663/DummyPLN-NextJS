import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  Col,
  Row,
  Statistic,
  Space,
  Typography,
  List,
  Button,
} from "antd";
import {
  UserOutlined,
  LineChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
  UserAddOutlined,
  BarChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const StatisticCards = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false}>
        <Statistic
          title={
            <Space>
              <UserOutlined />
              <span>Total Karyawan</span>
            </Space>
          }
          value={1234}
          suffix={<Text type="secondary">Karyawan aktif</Text>}
        />
        <Text
          style={{
            color: "#52c41a",
            fontSize: "12px",
            marginTop: "8px",
            display: "inline-block",
          }}
        >
          <ArrowUpOutlined /> +12%
        </Text>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false}>
        <Statistic
          title={
            <Space>
              <UserOutlined />
              <span>Hadir Hari Ini</span>
            </Space>
          }
          value={1156}
          suffix={<Text type="secondary">93.7% kehadiran</Text>}
        />
        <Text
          style={{
            color: "#52c41a",
            fontSize: "12px",
            marginTop: "8px",
            display: "inline-block",
          }}
        >
          <ArrowUpOutlined /> +2.3%
        </Text>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false}>
        <Statistic
          title={
            <Space>
              <UserOutlined />
              <span>Tidak Hadir</span>
            </Space>
          }
          value={78}
          suffix={<Text type="secondary">6.3% absen</Text>}
        />
        <Text
          style={{
            color: "#f5222d",
            fontSize: "12px",
            marginTop: "8px",
            display: "inline-block",
          }}
        >
          <ArrowDownOutlined /> -1.2%
        </Text>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card bordered={false}>
        <Statistic
          title={
            <Space>
              <LineChartOutlined />
              <span>Performa Tim</span>
            </Space>
          }
          value="87%"
          suffix={<Text type="secondary">Skor rata-rata</Text>}
        />
        <Text
          style={{
            color: "#52c41a",
            fontSize: "12px",
            marginTop: "8px",
            display: "inline-block",
          }}
        >
          <ArrowUpOutlined /> +5.4%
        </Text>
      </Card>
    </Col>
  </Row>
);

const activityData = [
  {
    title: "Evaluasi Bulanan",
    description: "12 karyawan menunggu evaluasi",
    buttonText: "Lihat Detail",
    buttonType: "primary",
  },
  {
    title: "Rekrutmen Baru",
    description: "5 kandidat dalam proses",
    buttonText: "Kelola",
    buttonType: "default",
    style: {
      backgroundColor: "#f6ffed",
      border: "1px solid #b7eb8f",
      borderRadius: "8px",
    },
  },
  {
    title: "Pelatihan Mendatang",
    description: "Workshop leadership minggu depan",
    buttonText: "Daftar",
    buttonType: "default",
  },
];

const ActivityCard = () => (
  <Card bordered={false}>
    <Title level={4}>Ringkasan Aktivitas</Title>
    <Text type="secondary">Data terkini manajemen SDM</Text>
    <List
      itemLayout="horizontal"
      dataSource={activityData}
      renderItem={(item, index) => (
        <List.Item
          style={item.style}
          actions={[
            <Button
              key={`action-btn-${index}`}
              type={
                item.buttonType as
                  | "primary"
                  | "default"
                  | "dashed"
                  | "link"
                  | "text"
              }
            >
              {item.buttonText}
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={<a>{item.title}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  </Card>
);

const QuickActionsCard = () => (
  <Card bordered={false}>
    <Title level={4}>Aksi Cepat</Title>
    <Text type="secondary">Akses fitur utama</Text>
    <Space
      direction="vertical"
      style={{ width: "100%", marginTop: "16px" }}
      size="middle"
    >
      <Button type="primary" icon={<CalendarOutlined />} block>
        Absensi Harian
      </Button>
      <Button icon={<UserAddOutlined />} block>
        Tambah Karyawan
      </Button>
      <Button icon={<BarChartOutlined />} block>
        Laporan Analytics
      </Button>
      <Button icon={<TeamOutlined />} block>
        Jadwal Tim
      </Button>
    </Space>
  </Card>
);

const OptimizationCard = () => (
  <Card
    style={{
      background: "linear-gradient(to right, #0050b3, #006d75)",
      color: "white",
      border: "none",
    }}
  >
    <Row align="middle" justify="space-between">
      <Col xs={24} md={16}>
        <Title level={4} style={{ color: "white" }}>
          Optimalkan Potensi SDM Anda
        </Title>
        <Paragraph style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          Gunakan AI Analytics untuk mendapatkan insight mendalam tentang
          performa dan engagement karyawan.
        </Paragraph>
      </Col>
      <Col xs={0} md={8} style={{ textAlign: "right" }}>
        <UserOutlined
          style={{ fontSize: "80px", color: "rgba(255, 255, 255, 0.3)" }}
        />
      </Col>
    </Row>
  </Card>
);

const DashboardPage = () => {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <div>
          <Text type="secondary">
            Selamat datang kembali! Berikut ringkasan data SDM hari ini.
          </Text>
        </div>

        <StatisticCards />

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <ActivityCard />
          </Col>
          <Col xs={24} lg={8}>
            <QuickActionsCard />
          </Col>
        </Row>

        <OptimizationCard />
      </Space>
    </MainLayout>
  );
};

export default DashboardPage;
