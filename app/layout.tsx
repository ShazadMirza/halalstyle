import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HalalStyle — The Excellence Filter for Modest Fashion",
  description:
    "AI-curated modest fashion for Muslim families in Canada. Take our style quiz and get 5 halal-verified picks in 60 seconds.",
  openGraph: {
    title: "HalalStyle — The Excellence Filter for Modest Fashion",
    description: "AI-powered halal modest fashion quiz. Get 5 personalised picks in 60 seconds.",
    url: "https://halalstyle.vercel.app",
    siteName: "HalalStyle",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
