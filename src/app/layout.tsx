import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

export const runtime = 'edge';
import Providers from '@/utils/Providers';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers></body>
    </html>
  );
}
