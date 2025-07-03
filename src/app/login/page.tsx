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
import { PhoneOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

// --- Define the data structure for the form ---
type LoginForm = {
  nomor: string;
  password: string;
  remember?: boolean;
};

// --- Main Login Page Component ---
export default function LoginPage() {
  const [form] = Form.useForm<LoginForm>();

  // --- Handler for form submission ---
  const onFinish = (values: LoginForm) => {
    console.log("Login Data Submitted:", values);
    message.success("Login successful! (Frontend simulation)");
  };

  // --- Handler for submission errors ---
  const onFinishFailed = () => {
    message.error("Please fill in all required fields.");
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
            <Title level={2}>Welcome Back!</Title>
            <Text type="secondary">
              Please enter your credentials to log in.
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
            {/* --- Number Input --- */}
            <Form.Item
              name="nomor"
              rules={[
                { required: true, message: "Please input your Number Phone!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "The input is not a valid Number Phone",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Nomor Handphone" />
            </Form.Item>

            {/* --- Password Input --- */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            {/* --- Remember Me & Forgot Password --- */}
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link href="/forgetPassword">Forgot password?</Link>
              </div>
            </Form.Item>

            {/* --- Submit Button --- */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register">Sign up now</Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
}
