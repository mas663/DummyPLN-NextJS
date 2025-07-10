"use client";

import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Checkbox,
  Card,
  Space,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

const { Title, Text } = Typography;

type LoginForm = {
  username: string;
  password: string;
  remember?: boolean;
};

export default function LoginPage() {
  const [form] = Form.useForm<LoginForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    console.log("Mencoba login dengan data:", values);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal.");
      }

      message.success("Login berhasil!");

      localStorage.setItem("authToken", data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        })
      );

      router.push("/home");
    } catch (error: unknown) {
      console.error("Terjadi kesalahan:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Gagal terhubung ke server.";
      message.error(errorMessage);
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Harap isi semua kolom yang diperlukan.");
  };

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
            <Title level={2}>Selamat Datang!</Title>
            <Text type="secondary">
              Silakan masukkan kredensial Anda untuk masuk.
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Harap masukkan username Anda!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="emilys" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Harap masukkan Password Anda!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="emilyspass"
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ingat saya</Checkbox>
                </Form.Item>
                <NextLink href="/forgetPassword">Lupa password?</NextLink>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Masuk
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ textAlign: "center" }}>
            Belum punya akun?{" "}
            <NextLink href="/register">Daftar sekarang</NextLink>
          </Text>
        </Space>
      </Card>
    </div>
  );
}
