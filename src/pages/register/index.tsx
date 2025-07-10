"use client";

import { Form, Input, Button, Typography, message, Card, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import type { FormProps } from "antd";
import NextLink from "next/link";
import { useState } from "react";

const { Title, Text } = Typography;

type RegisterForm = {
  namaLengkap: string;
  email: string;
  nomor: string;
  password: string;
  confirmPassword?: string;
};

export default function RegistrationPage() {
  const [form] = Form.useForm<RegisterForm>();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<RegisterForm>["onFinish"] = async (values) => {
    console.log("Data form asli yang diterima:", values);
    setLoading(true);

    const nameParts = values.namaLengkap.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || firstName;

    const apiPayload = {
      firstName: firstName,
      lastName: lastName,
      username: values.email.split("@")[0],
      email: values.email,
      password: values.password,
    };

    console.log("Data yang akan dikirim ke API dummyjson:", apiPayload);

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.id) {
          console.log("Registrasi berhasil (disimulasikan):", result);
          message.success(`Registrasi untuk ${result.firstName} berhasil!`);
        } else {
          throw new Error(result.message || "Gagal melakukan registrasi.");
        }
      } else {
        console.log("Registrasi berhasil:", result);
        message.success(`Registrasi untuk ${result.firstName} berhasil!`);
      }

      form.resetFields();
    } catch (error: unknown) {
      console.error("Terjadi kesalahan saat registrasi:", error);
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<RegisterForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    message.error("Harap isi semua kolom yang diperlukan dengan benar.");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "2rem 0",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2}>Buat Akun Baru</Title>
            <Text type="secondary">
              Isi formulir di bawah ini untuk mendaftar.
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
          >
            <Form.Item
              name="namaLengkap"
              rules={[
                {
                  required: true,
                  message: "Harap masukkan nama lengkap Anda!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nama Lengkap" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Harap masukkan email Anda!" },
                { type: "email", message: "Format email tidak valid!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Alamat Email" />
            </Form.Item>

            <Form.Item
              name="nomor"
              rules={[
                { required: true, message: "Harap masukkan Nomor HP Anda!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Nomor HP hanya boleh berisi angka!",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Nomor Handphone" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Harap masukkan password Anda!" },
                { min: 6, message: "Password minimal harus 6 karakter." },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Harap konfirmasi password Anda!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password yang Anda masukkan tidak cocok!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Konfirmasi Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Daftar
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ textAlign: "center" }}>
            Sudah punya akun?{" "}
            <NextLink href="../" passHref>
              Masuk di sini
            </NextLink>
          </Text>
        </Space>
      </Card>
    </div>
  );
}
