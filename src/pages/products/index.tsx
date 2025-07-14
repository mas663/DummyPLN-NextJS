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
} from "antd";
import MainLayout from "@/components/layout/MainLayout";
import api from "@/lib/api";

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

  const fetchProducts = async () => {
    try {
      const response = await api.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
      message.error("Gagal memuat data produk.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (values: { title: string; price: number }) => {
    try {
      const response = await api.post(
        "https://dummyjson.com/products/add",
        values
      );
      message.success(`Produk "${response.data.title}" berhasil ditambahkan.`);
      fetchProducts();
      return true;
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      message.error("Gagal menambahkan produk.");
      return false;
    }
  };

  const updateProduct = async (
    id: number,
    values: { title: string; price: number }
  ) => {
    try {
      await api.put(`https://dummyjson.com/products/${id}`, values);
      message.success(`Produk ID ${id} berhasil diperbarui.`);
      fetchProducts();
      return true;
    } catch (error) {
      console.error("Gagal memperbarui produk:", error);
      message.error("Gagal memperbarui produk.");
      return false;
    }
  };

  const deleteProduct = (id: number) => {
    Modal.confirm({
      title: "Anda yakin ingin menghapus produk ini?",
      content: "Tindakan ini tidak dapat dibatalkan.",
      okText: "Ya, Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk: async () => {
        try {
          await api.delete(`https://dummyjson.com/products/${id}`);
          message.success(`Produk ID ${id} berhasil dihapus.`);
          fetchProducts();
        } catch (error) {
          console.error("Gagal menghapus produk:", error);
          message.error("Gagal menghapus produk.");
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
              justifyContent: "flex-end",
              marginBottom: "16px",
            }}
          >
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
