import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Portal Mitra - Portal Layanan Digital Mitra Samira Travel',
  description: 'Pusat akses formulir dan layanan pengajuan digital mitra Samira Travel terpadu.',
  icons: {
    icon: '/favicon.ico', // Standard favicon path
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#F5FBFC]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
