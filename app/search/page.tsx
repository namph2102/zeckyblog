import React from "react";
import { Metadata } from "next";
import { getData } from "../sevices/untils";
import Link from "next/link";
import Image from "next/image";
import { IData } from "../sevices/typedata";
const domainsever = process.env.DOMAIN_URL || "https://blog.zecky.online";
const titleMessage = "Tổng hợp bài viết hay trên thế giới";
const descriptionMessage =
  "Tổng hợp bài viết tâm huyết tại Zecky, Hãy tham gia zecky để sử dụng ChatGPT phiên bản mới nhất, hoàn toàn miễn phí nhé!";
export const metadata: Metadata = {
  title: titleMessage,
  keywords: [
    "bài viết chatgpt",
    "zecky chat bot",
    "Chat GPT miễn phí",
    "nhắn tin",
    "trí tuệ nhân tạo",
  ],
  description: descriptionMessage,
  alternates: {
    canonical: process.env.DOMAIN_URL + "/search",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
      "vi-VN": "/vi-VN",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const AllBlog = async () => {
  const listBlogInPage: IData[] = await getData();

  const schema1 = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": domainsever,
          name: "Trang chủ",
        },
      },

      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": domainsever,
          name: "blog-developer",
        },
      },

      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `${domainsever}/search`,
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
      <div className="menu text-white text-sm mb-4 flex items-center gap-1  text-ellipsis overflow-hidden whitespace-nowrap">
        <Link href="/">Trang chủ</Link> /<p>Bài viết tổng hợp</p>
      </div>
      <h1 className="text-center mb-8">
        Tổng hợp {listBlogInPage.length} bài viết nổi bật tại Zecky 👈👈
      </h1>
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {listBlogInPage.map((blog) => (
          <article key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>
              <Image
                src={blog.image}
                width={200}
                height={100}
                alt="test"
                className="w-full sm:h-[200px] h-[300px] object-cover"
              />
              <h2 className="line-clamp-1 mt-2 px-2">{blog.title}</h2>
              <p className="indent-3 line-clamp-3 text-base">{blog.des}. </p>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AllBlog;
