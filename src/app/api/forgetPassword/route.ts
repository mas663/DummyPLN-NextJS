// src/app/api/lupa-password/route.ts
import { NextResponse } from "next/server";

// Simulasi database pengguna
const usersDatabase = [
  { id: 1, phone: "081234567890" },
  { id: 2, phone: "089876543210" },
];

export async function POST(request: Request) {
  try {
    // 1. Menerima dan membaca data JSON dari request
    const body = await request.json();
    const { nomor } = body;

    // 2. Validasi input
    if (!nomor) {
      return NextResponse.json(
        { success: false, message: "Nomor telepon wajib diisi." },
        { status: 400 } // Bad Request
      );
    }

    // 3. Simulasi cek ke database
    const userExists = usersDatabase.find((user) => user.phone === nomor);

    if (!userExists) {
      // Kita tetap kirim respon sukses untuk keamanan,
      // agar orang tidak bisa menebak nomor mana yang terdaftar.
      return NextResponse.json({
        success: true,
        message: "Jika nomor terdaftar, instruksi akan dikirim.",
      });
    }

    // 4. Jika pengguna ada, di sini logika untuk buat token dan kirim SMS/email
    console.log(
      `SIMULASI: Mengirim link reset ke nomor ${nomor} untuk user ID ${userExists.id}`
    );

    // 5. Kirim respon sukses
    return NextResponse.json({
      success: true,
      message: "Jika nomor terdaftar, instruksi akan dikirim.",
    });
  } catch (error) {
    console.error("Error pada API Lupa Password:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server." },
      { status: 500 } // Internal Server Error
    );
  }
}
