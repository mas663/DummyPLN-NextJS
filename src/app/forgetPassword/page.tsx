"use client";

import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Card,
  Space,
  Upload,
} from "antd";
import { PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import type { FormProps, UploadProps } from "antd";
import NextLink from "next/link";
import { useState } from "react";

const { Title, Text } = Typography;

// --- Mendefinisikan struktur data untuk form ---
type ForgotPasswordForm = {
  nomor: string;
};

// --- Komponen Utama Halaman Lupa Password ---
export default function ForgotPasswordPage() {
  const [form] = Form.useForm<ForgotPasswordForm>();
  const [loading, setLoading] = useState(false);

  // --- Handler untuk submit form (terhubung ke API) ---
  const onFinish: FormProps<ForgotPasswordForm>["onFinish"] = async (
    values
  ) => {
    console.log("Data Lupa Password:", values);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      message.success("Jika nomor terdaftar, link reset akan dikirim.");
      form.resetFields();
    } catch (error: unknown) {
      let errorMessage = "Gagal mengirim permintaan. Silakan coba lagi.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  // logika Lupa Password
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const App: React.FC = () => (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2}>Lupa Password</Title>
            <Text type="secondary">
              Masukkan nomor telepon Anda untuk menerima link reset password.
            </Text>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish} size="large">
            <Form.Item
              name="nomor"
              rules={[
                {
                  required: true,
                  message: "Harap masukkan nomor telepon Anda!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Nomor telepon harus berupa angka",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Nomor Handphone" />
            </Form.Item>

            <Form.Item label="Upload Dokumen">
              <App />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Kirim Link Reset
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ textAlign: "center" }}>
            Back to{" "}
            <NextLink href="/login" passHref legacyBehavior>
              Login
            </NextLink>
          </Text>
        </Space>
      </Card>
    </div>
  );
}
