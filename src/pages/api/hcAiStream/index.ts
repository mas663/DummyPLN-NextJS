import { NextApiRequest, NextApiResponse } from "next";

const aiResponses: { [key: string]: string } = {
  kinerja:
    "Analisis performa bulan ini menunjukkan peningkatan produktivitas sebesar 15% pada departemen teknis, terutama setelah implementasi sistem manajemen proyek yang baru. Namun, tingkat absensi di departemen non-teknis sedikit meningkat. Direkomendasikan untuk mengadakan sesi feedback untuk menggali penyebabnya.",
  rekrutmen:
    "Untuk kuartal depan, prioritas rekrutmen adalah pada posisi 'Data Scientist' dan 'Senior Frontend Developer'. Proses seleksi akan difokuskan pada kandidat dengan pengalaman minimal 3 tahun di industri teknologi finansial. Budget yang dialokasikan adalah sebesar Rp 2 Miliar.",
  pelatihan:
    "Program pelatihan yang paling mendesak adalah 'Advanced Leadership' untuk level manajer dan 'Cybersecurity Awareness' untuk seluruh karyawan. Pelatihan ini bertujuan untuk meningkatkan kapabilitas kepemimpinan dan mengurangi risiko keamanan siber.",
  default:
    "Maaf, saya belum bisa memproses permintaan itu. Coba ajukan pertanyaan seputar kinerja karyawan, rencana rekrutmen, atau kebutuhan pelatihan.",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  let selectedResponse = aiResponses.default;
  if (prompt.toLowerCase().includes("kinerja")) {
    selectedResponse = aiResponses.kinerja;
  } else if (prompt.toLowerCase().includes("rekrutmen")) {
    selectedResponse = aiResponses.rekrutmen;
  } else if (prompt.toLowerCase().includes("pelatihan")) {
    selectedResponse = aiResponses.pelatihan;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const words = selectedResponse.split(" ");
  let wordIndex = 0;

  const intervalId = setInterval(() => {
    if (wordIndex < words.length) {
      const word = words[wordIndex];
      res.write(`data: ${word} \n\n`);
      wordIndex++;
    } else {
      res.write("data: [DONE]\n\n");
      clearInterval(intervalId);
      res.end();
    }
  }, 80);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
}
