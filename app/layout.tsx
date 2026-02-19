import type { Metadata } from "next";
import {
    Caudex, Cormorant_Garamond,
    Courier_Prime,
    Edu_TAS_Beginner,
    Nothing_You_Could_Do, Noto_Sans_HK,
    Noto_Serif_HK,
    Playpen_Sans, Ubuntu, UnifrakturCook
} from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_HK({
    variable: "--font-noto-serif-hk",
    subsets: ["latin", "latin-ext", "cyrillic"],
    weight: "300"
})

const notoSans = Noto_Sans_HK({
    variable: "--font-noto-sans-hk",
    subsets: ["latin", "latin-ext", "cyrillic"],
    weight: "400"
})

const notoSansExtraLight = Noto_Sans_HK({
    variable: "--font-noto-sans-hk",
    subsets: ["latin", "latin-ext", "cyrillic"],
    weight: "200"
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

const ubuntu = Ubuntu({
    variable: "--font-ubuntu",
    subsets: ["latin", "latin-ext"],
    weight: "400"
})

const unifrakturCook = UnifrakturCook({
    variable: "--font-unifraktur-cook",
    weight: "700",
    subsets: ["latin"]
})

const cormorantGaramond = Cormorant_Garamond({
    variable: "--font-cormorant-garamond",
    weight: "variable",
    subsets: ["latin"]
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
        className={`${notoSerif.variable} ${cormorantGaramond.variable} ${nothingYouCouldDo.variable} ${eduTasBeginner.variable} ${caudex.variable} ${playpenSans.variable} ${courierPrime.variable} ${ubuntu.variable} ${notoSans.variable} ${notoSansExtraLight.variable} ${unifrakturCook.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
