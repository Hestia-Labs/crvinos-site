import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

export const runtime = 'edge';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
