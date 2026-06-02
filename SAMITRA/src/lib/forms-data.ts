export interface ServiceForm {
  id: string;
  name: string;
  category: "Dokumen" | "Marketing" | "Event" | "Kemitraan" | "Merchandise";
  description: string;
  link: string;
  requirements?: string[];
}

export const CATEGORIES = [
  "Semua",
  "Dokumen",
  "Marketing",
  "Event",
  "Kemitraan",
  "Merchandise"
] as const;

export const FORMS_DATA: ServiceForm[] = [
  {
    id: "umroh-jamaah",
    name: "Form Permintaan Surat Keterangan Umroh Jamaah",
    category: "Dokumen",
    description: "Butuh surat resmi untuk keberangkatan jamaah? Ajukan di sini ya.",
    link: "https://forms.gle/919jxKEAjfiC8xd6A",
    requirements: [
      "Nama lengkap sesuai KTP",
      "Nomor manifest jamaah",
      "Tanggal keberangkatan",
      "Scan KTP"
    ]
  },
  {
    id: "cuti-jamaah",
    name: "Form Pengajuan Cuti Jamaah",
    category: "Dokumen",
    description: "Formulir untuk jamaah yang ingin mengajukan izin cuti khusus.",
    link: "https://forms.gle/iiSAdMn83uf7jffJ9",
    requirements: [
      "Alasan cuti yang jelas",
      "Durasi cuti",
      "Persetujuan koordinator (jika ada)"
    ]
  },
  {
    id: "rekomendasi-passport",
    name: "Form Permintaan Surat Rekomendasi Passport",
    category: "Dokumen",
    description: "Bantu jamaah urus passport dengan surat rekomendasi resmi.",
    link: "https://forms.gle/rEamrqTboHKzGDFc6",
    requirements: [
      "Fotokopi KTP",
      "Fotokopi Kartu Keluarga",
      "Bukti DP / Pelunasan Umroh"
    ]
  },
  {
    id: "landing-page",
    name: "Form Pemesanan Landing Page",
    category: "Marketing",
    description: "Mau punya website sendiri buat promo? Kami buatkan landing page keren.",
    link: "https://forms.gle/61KK33u47qGwKHHk6",
    requirements: [
      "Nama Paket Umroh",
      "Foto-foto dokumentasi (jika ada)",
      "Nomor WhatsApp tujuan"
    ]
  },
  {
    id: "ads-sosmed",
    name: "Form Pemesanan Iklan Sosial Media",
    category: "Marketing",
    description: "Bantu promosi paket umroh Anda lewat iklan di Facebook atau Instagram.",
    link: "https://forms.gle/8DLwDzzQ8nuMpfWWA",
    requirements: [
      "Materi iklan (gambar/video)",
      "Target audiens",
      "Anggaran iklan (budget)"
    ]
  },
  {
    id: "daftar-seminar",
    name: "Form Pendaftaran Seminar",
    category: "Event",
    description: "Daftar seminar atau workshop untuk tambah ilmu operasional travel.",
    link: "https://forms.gle/g6AyzniLi6cdrkN97",
    requirements: [
      "Bukti keanggotaan mitra",
      "Email aktif untuk Zoom/Materi"
    ]
  },
  {
    id: "report-seminar",
    name: "Form Report Seminar",
    category: "Event",
    description: "Selesai bikin acara? Jangan lupa lapor kegiatannya di sini ya.",
    link: "https://forms.gle/vcbdhU35THB67jpQYA",
    requirements: [
      "Foto dokumentasi acara",
      "Jumlah peserta hadir",
      "Ringkasan hasil acara"
    ]
  },
  {
    id: "mitra-baru",
    name: "Form Pendaftaran Mitra Baru",
    category: "Kemitraan",
    description: "Mau ajak teman jadi mitra? Yuk daftar lewat formulir ini.",
    link: "https://forms.gle/svVpJjctUbGDNFDz8",
    requirements: [
      "Data lengkap calon mitra",
      "Scan KTP calon mitra",
      "NPWP (jika ada)"
    ]
  },
  {
    id: "pre-order-amitra",
    name: "Data Isian Pre-Order Amitra",
    category: "Kemitraan",
    description: "Pesan produk Amitra lebih awal lewat sistem pre-order kami.",
    link: "https://forms.gle/mdByM6sVB7tGoaKSA",
    requirements: [
      "Data calon debitur",
      "Pilihan tenor pembiayaan"
    ]
  },
  {
    id: "kalender-2025",
    name: "Form Pemesanan Kalender Samira 2025",
    category: "Merchandise",
    description: "Dapatkan kalender eksklusif 2025 untuk dibagikan ke jamaah.",
    link: "https://forms.gle/n6bWrETCKMTXQ9eC8",
    requirements: [
      "Jumlah pesanan",
      "Alamat pengiriman lengkap"
    ]
  },
];
