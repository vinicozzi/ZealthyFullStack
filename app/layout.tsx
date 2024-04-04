import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";


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
      <Head>
        <meta name="viewport" content="user-scalable=no" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}