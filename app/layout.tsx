import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "./component";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
const domainsever = process.env.DOMAIN_URL || "https://zecky.online";
export const metadata: Metadata = {
  title: "Zecky - Ứng dụng nhắn tin",
  generator: "Zecky - Ứng dụng nhắn tin",
  applicationName: "Zecky - Ứng dụng nhắn tin",
  referrer: "origin-when-cross-origin",
  keywords: ["zecky bài viết", "zecky blog", "zecky chính sách"],
  authors: [
    { name: "Phạm Hoài Nam" },
    { name: "Hoài Nam", url: "https://www.facebook.com/namhoai2102" },
  ],
  creator: "Phạm Hoài Nam",
  publisher: "Phạm Hoài Nam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: domainsever,
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
      "vi-VN": "/vi-VN",
    },
  },
  metadataBase: new URL(domainsever),
  description:
    "Hãy cùng khám phá ứng dụng Zecky tuyệt vời này, chatGPT hoàn toàn miễn phí. Với zecky, để giúp đỡ khách hàng trong việc tìm kiếm thông tin và giải đáp các câu hỏi liên quan đến sản phẩm hoặc dịch vụ của bạn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning={true} className={inter.className}>
        <div className="container mx-auto">
          <Header />
          <div className="min-h-[60vh]">{children}</div>
          <Footer />
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
