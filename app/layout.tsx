import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | Grain 映画学習システム",
    default: "Grain",
  },
  description:
    "映画史と業界の知識を体系的に学ぶハリウッド発・日本唯一の映画学習システム",
  openGraph: {
    title: "Grain 映画学習システム",
    description:
      "映画史と業界の知識を体系的に学ぶハリウッド発・日本唯一の映画学習システム",
    images: ["/Grain ogp.png"],
  },
  alternates: {
    canonical: "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-HN4KE7BWDG" />
    </html>
  );
}
