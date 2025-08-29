import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | シンプルなコーポレートサイト",
    default: "シンプルなコーポレートサイト",
  },
  description:
    "「Next.js+ヘッドレスCMSではじめる！かんたん・モダンWebサイト制作入門」で作成されるサイトです。",
  openGraph: {
    title: "シンプルなコーポレートサイト",
    description:
      "「Next.js+ヘッドレスCMSではじめる！かんたん・モダンWebサイト制作入門」で作成されるサイトです。",
    images: ["/ogp.png"],
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
