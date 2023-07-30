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
const DOMAIN_HOST = process.env.DOMAIN_URL || "https://blog.zecky.online";
const titleMessage = "Tổng hợp tin tức nổi bật nhất";
const descriptionMessage =
  "Tổng hợp tin tức tâm huyết tại Zecky, Hãy tham gia zecky để sử dụng ChatGPT phiên bản mới nhất, hoàn toàn miễn phí nhé!";
export const metadata: Metadata = {
  title: titleMessage,
  keywords: [
    "tin tức chatgpt",
    "zecky chat bot",
    "Chat GPT miễn phí",
    "nhắn tin",
    "trí tuệ nhân tạo",
  ],
  description: descriptionMessage,
  alternates: {
    canonical: process.env.DOMAIN_URL + "/tim-kiem",
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
  icons: listIconsSeo,
};

const AllBlog = async () => {
  const listBlogInPage: IDataBlog[] = await getTopBlog(50);
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
          "@id": DOMAIN_HOST,
          name: "blog-developer",
        },
      },

      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `${DOMAIN_HOST}/search`,
          name: `✅${titleMessage}`,
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
      ratingCount: "6",
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
          <Link className="capitalize" href={`/tin-tuc`}>
            tin tức
          </Link>
          <BiChevronRight />
          <p className="capitalize text-sm">tin tức tổng hợp</p>
        </nav>
      </div>
      <h1 className="text-center mt-8">
        Tổng hợp {listBlogInPage.length} tin tức nổi bật tại Zecky 👈👈
      </h1>
      <ShareSocial link={`${DOMAIN_HOST + "/tim-kiem"}`} />
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {listBlogInPage.map((blog) => (
          <ItemDetailViewMore key={blog._id} blog={blog} />
        ))}
      </section>
    </div>
  );
};

export default AllBlog;
