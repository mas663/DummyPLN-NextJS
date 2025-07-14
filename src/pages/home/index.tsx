import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Typography } from "antd";

const { Paragraph } = Typography;

const DashboardPage = () => {
  return (
    <MainLayout>
      <Paragraph>
        Ini adalah halaman utama setelah login. Konten ini ditampilkan di dalam
        layout utama yang memiliki Sidebar dan Header.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt sed
        impedit quod aliquid mollitia natus eligendi tempore doloribus atque
        reprehenderit saepe sint laudantium rem temporibus provident, corrupti
        perspiciatis eaque ipsam.
      </Paragraph>
    </MainLayout>
  );
};

export default DashboardPage;
