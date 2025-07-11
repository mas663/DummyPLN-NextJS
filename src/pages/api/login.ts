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
    const { username, password } = req.body;

    if (username === "emilys" && password === "emilyspass") {
      const userPayload = {
        id: 1,
        username: "emilys",
        name: "Emily Johnson",
        role: "user",
      };

      const secretKey =
        process.env.JWT_SECRET_KEY || "SECRET_KEY_YANG_SANGAT_RAHASIA";

      const token = sign(userPayload, secretKey, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login berhasil",
        token: token,
        user: {
          username: userPayload.username,
          name: userPayload.name,
        },
      });
    } else {
      return res.status(401).json({ message: "Username atau password salah" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
}
