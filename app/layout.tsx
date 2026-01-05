import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const soraSans = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "Created by the Tesla Ambassador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraSans.variable} antialiased p-4 pb-8 md:p-8 lg:py-8 lg:px-28`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
