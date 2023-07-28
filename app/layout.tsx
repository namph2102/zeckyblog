import "./globals.css";
import "./styles/blogdetail.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
const domainsever = process.env.DOMAIN_URL || "https://zecky.online";
export const metadata: Metadata = {
  title: "Tin tức 24h mới nhất, tin nhanh, tin nóng hàng ngày | Báo Zecky",
  generator: "Tin tức 24h mới nhất, tin nhanh, tin nóng hàng ngày | Báo Zecky",
  applicationName:
    "Tin tức 24h mới nhất, tin nhanh, tin nóng hàng ngày | Báo Zecky",
  referrer: "origin-when-cross-origin",
  keywords: ["zecky bài viết", "zecky blog", "zecky chính sách", "báo"],
  authors: [
    { name: "Phạm Hoài Nam" },
    { name: "Hoài Nam", url: "https://www.facebook.com/namhoai2102" },
  ],
  creator: "Phạm Hoài Nam",
  publisher: "Phạm Hoài Nam",

  alternates: {
    canonical: domainsever,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  metadataBase: new URL(domainsever),
  description:
    "Tin tức 24h, đọc báo TN cập nhật tin nóng online Việt Nam và thế giới mới nhất trong ngày, tin nhanh thời sự, chính trị, xã hội hôm nay, tin tức, top news VN",
};
import Script from "next/script";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_KEY}`}
      />
      <Script strategy="lazyOnload" id="my-script">
        {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.GOOGLE_ANALYTICS_KEY}', {
                      page_path: window.location.pathname,
                      });
                   
                  `}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-B9JLVXP3YJ"
        strategy="lazyOnload"
      />
      <Script strategy="lazyOnload" id="my-script">
        {` 
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-B9JLVXP3YJ');
      `}
      </Script>

      <body suppressHydrationWarning={true} className={inter.className}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
