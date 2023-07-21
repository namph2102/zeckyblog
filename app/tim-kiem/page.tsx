import React from "react";
import { Metadata } from "next";
import { capitalizeText, componentsProps, getData } from "../sevices/untils";
import Link from "next/link";
import Image from "next/image";
import { IDataBlog } from "../sevices/typedata";
import cateController, {
  ICateCreate,
} from "../sevices/controller/cateController";
import { Header } from "../component";
import { BiChevronRight } from "react-icons/bi";
import ShareSocial from "../component/ShareSocial";
import { RiEyeLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";
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
  const listBlogInPage: IDataBlog[] = await getData();
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
          <p className="capitalize">tin tức tổng hợp</p>
        </nav>
      </div>
      <h1 className="text-center mt-8">
        Tổng hợp {listBlogInPage.length} tin tức nổi bật tại Zecky 👈👈
      </h1>
      <ShareSocial link={`${DOMAIN_HOST + "/tim-kiem"}`} />
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {listBlogInPage.map((blog) => (
          <article key={blog.slug}>
            <Link href={`/${blog.slug}`}>
              <Image
                src={blog.image}
                width={200}
                height={100}
                alt={blog.title}
                className="w-full sm:h-[200px] h-[300px] object-cover"
              />

              <h2 className="line-clamp-1 mt-2 px-2">{blog.title}</h2>
              <p className="indent-3 line-clamp-3 text-base">{blog.des}. </p>
              <div className="flex justify-between capitalize">
                <span></span>
                <Tooltip
                  arrow
                  componentsProps={componentsProps}
                  placement="bottom"
                  title={`Tác giả: ${capitalizeText(blog.author.fullname)}`}
                >
                  <p className="text-xs font-medium flex items-center gap-1 pt-1">
                    <RiEyeLine /> {blog.view.toLocaleString()}
                  </p>
                </Tooltip>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AllBlog;
