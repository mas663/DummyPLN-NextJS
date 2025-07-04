import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const DashboardPage = () => {
  return (
    <MainLayout>
      <Title level={2}>Selamat Datang di Dashboard</Title>
      <Paragraph>
        Ini adalah halaman utama Anda setelah berhasil login. Konten ini
        ditampilkan di dalam layout utama yang memiliki Sidebar dan Header.
      </Paragraph>
      <Paragraph>
        Anda bisa mulai menambahkan komponen lain di sini, seperti kartu
        statistik, grafik, atau tabel data.
      </Paragraph>
    </MainLayout>
  );
};

export default DashboardPage;
