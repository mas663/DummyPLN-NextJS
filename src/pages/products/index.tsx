"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
} from "antd";
import MainLayout from "@/components/layout/MainLayout";

const { Title } = Typography;

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  // --- READ: Mengambil data produk saat komponen dimuat ---
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data produk awal berhasil diambil:", data.products);
        setProducts(data.products);
      });
  }, []);

  // --- CREATE: Menambahkan produk baru ---
  const addProduct = async (values: { title: string; price: number }) => {
    console.log("Mencoba menambahkan produk dengan data:", values);
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const result = await res.json();
      console.log("Respons API (Add):", result);

      const newProduct = { ...values, id: result.id };
      setProducts([newProduct, ...products]);
      message.success(`Produk "${values.title}" berhasil ditambahkan.`);
      return true;
    } else {
      message.error("Gagal menambahkan produk.");
      console.error("Gagal menambahkan produk. Status:", res.status);
      return false;
    }
  };

  // --- UPDATE: Mengedit produk yang ada ---
  const updateProduct = async (
    id: number,
    values: { title: string; price: number }
  ) => {
    console.log(`Mencoba update produk ID: ${id} dengan data:`, values);
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const updatedProduct = await res.json();
      console.log("Respons API (Update):", updatedProduct);

      setProducts(
        products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
      );
      message.success(`Produk ID ${id} berhasil diperbarui.`);
      return true;
    } else {
      message.error("Gagal memperbarui produk.");
      console.error(`Gagal update produk ID: ${id}. Status:`, res.status);
      return false;
    }
  };

  // --- DELETE: Menghapus produk ---
  const deleteProduct = async (id: number) => {
    Modal.confirm({
      title: "Anda yakin ingin menghapus produk ini?",
      content: "Tindakan ini tidak dapat dibatalkan.",
      okText: "Ya, Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk: async () => {
        console.log(`Mencoba menghapus produk ID: ${id}`);
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          const result = await res.json();
          console.log("Respons API (Delete):", result);

          setProducts(products.filter((p) => p.id !== id));
          message.success(`Produk ID ${id} berhasil dihapus.`);
        } else {
          message.error("Gagal menghapus produk.");
          console.error(
            `Gagal menghapus produk ID: ${id}. Status:`,
            res.status
          );
        }
      },
    });
  };

  const showModal = (product: Product | null = null) => {
    setEditingProduct(product);
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      let success = false;

      if (editingProduct) {
        success = await updateProduct(editingProduct.id, values);
      } else {
        success = await addProduct(values);
      }

      if (success) {
        setIsModalVisible(false);
        setEditingProduct(null);
      }
    } catch (error) {
      console.error("Validasi form gagal:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: Product, b: Product) => a.id - b.id,
    },
    {
      title: "Nama Produk",
      dataIndex: "title",
      key: "title",
      sorter: (a: Product, b: Product) => a.title.localeCompare(b.title),
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toLocaleString()}`,
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_: unknown, record: Product) => (
        <Space size="small">
          <Button type="primary" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button danger onClick={() => deleteProduct(record.id)}>
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen text-black">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={2} style={{ marginBottom: 0 }}>
              Manajemen Produk
            </Title>
            <Button type="primary" onClick={() => showModal()}>
              Tambah Produk
            </Button>
          </div>

          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            bordered
            scroll={{ x: true }}
          />
        </Space>

        <Modal
          title={editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
          open={isModalVisible}
          onOk={handleFormSubmit}
          onCancel={handleCancel}
          okText="Simpan"
          cancelText="Batal"
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            name="product_form"
            className="mt-6"
          >
            <Form.Item
              name="title"
              label="Nama Produk"
              rules={[
                { required: true, message: "Silakan masukkan nama produk!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Harga"
              rules={[
                { required: true, message: "Silakan masukkan harga produk!" },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                addonBefore="$"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
}
