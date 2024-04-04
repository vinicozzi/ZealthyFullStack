import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zealthy Full Stack Exercise ",
  description: "Full Stack Exercise for Zealthy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <meta name="viewport" content="user-scalable=no width=device-width, initial-scale=1, maximum-scale=1" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}