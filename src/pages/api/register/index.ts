import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { namaLengkap, email, password, nomor } = req.body;

    if (!namaLengkap || !email || !password || !nomor) {
      return res
        .status(400)
        .json({ message: "Semua field wajib harus diisi." });
    }

    console.log("Data Registrasi Diterima di Server:", req.body);

    const newUserId = Math.floor(Math.random() * 1000);
    const userPayload = {
      id: newUserId,
      username: email.split("@")[0],
      name: namaLengkap,
      role: "user",
    };

    const secretKey =
      process.env.JWT_SECRET_KEY || "SECRET_KEY_YANG_SANGAT_RAHASIA";

    const token = sign(userPayload, secretKey, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "Registrasi berhasil!",
      token: token,
      user: {
        username: userPayload.username,
        name: userPayload.name,
      },
    });
  } catch (error) {
    console.error("Error pada API Registrasi:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}
