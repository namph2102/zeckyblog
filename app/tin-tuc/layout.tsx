import { Metadata } from "next";
import { Footer } from "../component";
const domainsever = process.env.DOMAIN_URL || "https://zecky.online";
export const metadata: Metadata = {
  title: "Tổng hợp tin tức hay tại zecky tha hồ tìm kiếm và lọc ",
  generator: "Tổng hợp tin tức hay tại zecky tha hồ tìm kiếm và lọc  ",
  applicationName:
    "Tổng hợp tin tức hay tại zecky tha hồ tìm kiếm và lọc ",
  referrer: "origin-when-cross-origin",
  keywords: ["zecky bài viết", "zecky blog", "zecky chính sách", "báo"],
  authors: [
    { name: "Phạm Hoài Nam" },
    { name: "Hoài Nam", url: "https://www.facebook.com/namhoai2102" },
  ],

  metadataBase: new URL(domainsever),
  description:
    "Trang tin tức, thời sự hay của việt nam, kèm theo bộ lọc tin tức sang xịn mịn. Hãy đọc tin mới nhất mỗi ngày để có kiến thức bạn nhé",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="min-h-[60vh]">{children}</div>
      <Footer />
    </div>
  );
}
