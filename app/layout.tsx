import type { Metadata } from "next";
import {
    Caudex,
    Courier_Prime,
    Edu_TAS_Beginner,
    Nothing_You_Could_Do,
    Noto_Serif_HK,
    Playpen_Sans
} from "next/font/google";
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

const eduTasBeginner = Edu_TAS_Beginner({
    variable: "--font-eds-tas-beginner",
    subsets: ["latin"],
    weight: "400"
})

const caudex = Caudex({
    variable: "--font-caudex",
    subsets: ["latin", "latin-ext", "greek", "greek-ext"],
    weight: "400"
})

const playpenSans = Playpen_Sans({
    variable: "--font-playpen-sans",
    subsets: ["latin", "latin-ext"],
    weight: "400"
})

const courierPrime = Courier_Prime({
    variable: "--font-courier-prime",
    subsets: ["latin", "latin-ext"],
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
        className={`${notoSerif.variable} ${nothingYouCouldDo.variable} ${eduTasBeginner.variable} ${caudex.variable} ${playpenSans.variable} ${courierPrime.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
