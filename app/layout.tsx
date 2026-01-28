import type { Metadata } from "next";
import { Noto_Serif_HK } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_HK({
    variable: "--font-noto-serif-hk",
    subsets: ["latin", "latin-ext", "cyrillic"],
    weight: "300"
})

export const metadata: Metadata = {
  title: "AETERNUS ARCHIVES",
  description: "a project by gabriel augustyn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
