// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nomor, password } = body;

  if (nomor === "08111111111" && password === "123456") {
    return NextResponse.json({ message: "Login berhasil", name: "Admin" });
  }

  return NextResponse.json(
    { message: "Email atau password salah" },
    { status: 401 }
  );
}
