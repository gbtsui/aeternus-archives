import type { Metadata } from "next";
import {Nothing_You_Could_Do, Noto_Serif_HK} from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_HK({
    variable: "--font-noto-serif-hk",
    subsets: ["latin", "latin-ext", "cyrillic"],
    weight: "300"
})

const nothingYouCouldDo = Nothing_You_Could_Do({
    variable: "--font-nothing-you-could-do",
    subsets: ["latin"],
    weight: "400"
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
        className={`${notoSerif.variable} ${nothingYouCouldDo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
