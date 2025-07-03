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
import { useState } from "react"; // Diperlukan untuk state loading

const { Title, Text } = Typography;

// Mendefinisikan struktur data untuk form registrasi
type RegisterForm = {
  namaLengkap: string;
  email: string;
  nomor: string;
  password: string;
  confirmPassword?: string;
};

// Komponen Utama Halaman Registrasi
export default function RegistrationPage() {
  const [form] = Form.useForm<RegisterForm>();
  const [loading, setLoading] = useState(false); // State untuk loading button

  // --- FUNGSI onFinish DIPERBARUI UNTUK MEMANGGIL API ---
  const onFinish: FormProps<RegisterForm>["onFinish"] = async (values) => {
    console.log("Data form yang diterima:", values);
    setLoading(true); // Mulai loading

    // --- FIX 1: Menghindari error 'no-unused-vars' dari ESLint ---
    // Cara ini lebih eksplisit untuk menghapus properti sebelum mengirim ke API
    const apiValues = { ...values };
    delete apiValues.confirmPassword;

    try {
      // Panggil API route lokal Anda
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiValues),
      });

      const result = await response.json();

      if (!response.ok) {
        // Jika server mengembalikan error (misal: status 400 atau 500)
        // Tampilkan pesan error dari server
        throw new Error(result.message || "Gagal melakukan registrasi.");
      }

      // Jika berhasil
      message.success(result.message);
      form.resetFields();
    } catch (error: unknown) {
      // --- FIX 2: Menggunakan 'unknown' untuk error handling yang lebih aman ---
      console.error("Terjadi kesalahan saat registrasi:", error);
      // Lakukan type check sebelum mengakses properti 'message'
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      message.error(errorMessage);
    } finally {
      // Pastikan loading selalu berhenti
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
            {/* ... Form.Item lainnya tidak berubah ... */}
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
            <NextLink href="/login" passHref>
              Masuk di sini
            </NextLink>
          </Text>
        </Space>
      </Card>
    </div>
  );
}
