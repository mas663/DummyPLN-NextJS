"use client";

import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      MAS ©{new Date().getFullYear()} - Dibuat Oleh Affan
    </Footer>
  );
};

export default AppFooter;
