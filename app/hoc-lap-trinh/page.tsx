import React from "react";
import { Metadata } from "next";
import { getTopBlog, listIconsSeo } from "../sevices/untils";
import Link from "next/link";

import { IDataBlog } from "../sevices/typedata";
import cateController from "../sevices/controller/cateController";
import { Header } from "../component";
import { BiChevronRight } from "react-icons/bi";
import ShareSocial from "../component/ShareSocial";

import ItemDetailViewMore from "../component/ItemDetailViewMore";
export const revalidate = 3600;
const DOMAIN_HOST = process.env.DOMAIN_URL || "https://blog.zecky.online";
const titleMessage = "Học lập trình cơ bản";
const descriptionMessage =
  "Danh mục học lập trình là tập hợp các khóa học và tài liệu liên quan đến việc học và phát triển kỹ năng lập trình. Chương trình bao gồm các khía cạnh cơ bản và nâng cao của lập trình, bao gồm ngôn ngữ lập trình phổ biến như Python, Java, JavaScript và C++. Các học viên sẽ tìm hiểu về cú pháp, lô-gic, thuật toán, và quy trình phát triển phần mềm. Ngoài ra, họ cũng sẽ được làm quen với công cụ và kỹ thuật để tối ưu hoá mã nguồn và xây dựng ứng dụng.";
export const metadata: Metadata = {
  title: titleMessage,
  keywords: [
    "hoc lap trinh",
    "hoc lap javascript",
    "hoc lap reactjs",
    "hoc lap nodejs",
    "hoc lap express",
    "hoc lap python",

    "nhắn tin",
    "trí tuệ nhân tạo",
  ],
  description: descriptionMessage,
  alternates: {
    canonical: process.env.DOMAIN_URL + "/hoc-lap-trinh",
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
  twitter: {
    card: "summary_large_image",
    title: titleMessage,
    description: descriptionMessage,
    siteId: "1646660186759892992",
    creator: "blog.zecky.online",
    creatorId: "1646660186759892992",
    images: "https://i.imgur.com/6BSxNTi.jpg",
  },

  openGraph: {
    title: titleMessage,
    description: descriptionMessage,
    images: {
      url: "https://i.imgur.com/6BSxNTi.jpg",
      alt: titleMessage,
    },
    type: "article",

    authors: ["zecky.online", "blog.zecky.online"],
  },

  icons: listIconsSeo,
};

const AllBlog = async () => {
  const listBlog: IDataBlog[] = await cateController.getblogfollowCate(
    "lap-trinh",
    50
  );
  const { listCate } = await cateController.getAllcate();
  const schema1 = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": DOMAIN_HOST,
          name: "Trang chủ",
        },
      },

      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${DOMAIN_HOST}/hoc-lap-trinh`,
          name: `✅ Học Lập trình`,
        },
      },
    ],
  };
  const schema2 = {
    "@context": "http://schema.org/",
    "@type": "Book",
    name: titleMessage,
    description: descriptionMessage,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      ratingCount: listBlog.length || 13,
    },
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema1) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema2) }}
      />
      <Header listMenu={listCate} />
      <div className="menu text-white text-sm mb-4 flex justify-between items-center gap-1  text-ellipsis overflow-hidden whitespace-nowrap">
        <nav className="flex items-center gap-1">
          <Link className="capitalize" href={`/`}>
            Trang chủ
          </Link>
          <BiChevronRight />
          <Link
            className="capitalize last_child"
            href={`/tin-tuc?category=lap-trinh`}
          >
            Học lập trình
          </Link>
        </nav>
      </div>
      <h1 className="text-center mt-8">
        Tổng hợp {listBlog.length} Tips học lập trình
      </h1>
      <ShareSocial link={`${DOMAIN_HOST + "/hoc-lap-trinh"}`} />
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {listBlog.map((blog) => (
          <ItemDetailViewMore key={blog._id} blog={blog} />
        ))}
      </section>
      <p className="text-center flex justify-center mt-4 ">
        <Link className="hover:text-hover" href={`/tin-tuc?category=lap-trinh`}>
          Xem thêm
        </Link>
      </p>
    </div>
  );
};

export default AllBlog;
