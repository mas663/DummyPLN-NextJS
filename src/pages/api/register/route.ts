import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { namaLengkap, email, nomor, password } = body;

    // --- Validasi di Sisi Server ---
    // Pastikan semua data yang dibutuhkan ada
    if (!namaLengkap || !email || !nomor || !password) {
      return NextResponse.json(
        { message: "Semua field harus diisi." },
        { status: 400 } // 400 Bad Request
      );
    }

    console.log("Data Registrasi Diterima di Server:", body);

    // Kirim respons sukses
    return NextResponse.json(
      {
        message: "Registrasi berhasil!",
        user: { namaLengkap, email, nomor },
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    // Tangani jika terjadi error saat parsing JSON atau error tak terduga lainnya
    console.error("Error pada API Registrasi:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
