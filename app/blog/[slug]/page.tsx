import { IData } from "@/app/sevices/typedata";
import { getData, getDataDetail } from "@/app/sevices/untils";
import Link from "next/link";

interface Fulldata extends IData {
  createdAt: string;
  updatedAt: string;
}
import React, { FC } from "react";
interface ParamsBlog {
  params: { slug: string };
}

const domainsever = process.env.DOMAIN_URL || "https://blog.zecky.online";
export async function generateMetadata({ params }: ParamsBlog) {
  const data: Fulldata = await getDataDetail(params.slug);
  return {
    title: data.title + " | Zecky",
    description: data.des,
    keywords: [data.title, ...data.title.split(" ")],
    metadataBase: new URL(`${domainsever}/blog/${data.slug}`),
    alternates: {
      canonical: process.env.DOMAIN_URL,
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
        "vi-VN": "/vi-VN",
      },
    },
    openGraph: {
      title: data.title,
      description: data.des,
      type: "article",
      publishedTime: data.updatedAt,
      authors: ["zecky.online", "blog.zecky.online", "Phạm Hoài Nam"],
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
}

export async function generateStaticParams() {
  const userData: Promise<IData[]> = await getData();
  const users = await userData;

  const path = users.map(({ slug }) => ({
    slug,
  }));

  return path;
}

const BlogDetail: FC<ParamsBlog> = async ({ params }) => {
  const data: Fulldata = await getDataDetail(params.slug);
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
          "@id": `${domainsever}/blog/${data.slug}`,
          name: `✅${data.title}`,
        },
      },
    ],
  };
  const schema2 = {
    "@context": "http://schema.org/",
    "@type": "Book",
    name: data.title,
    description: data.des,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      ratingCount: "1",
    },
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema1) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema2) }}
      />

      <div className="menu text-white text-sm mb-4 flex items-center gap-1  text-ellipsis overflow-hidden whitespace-nowrap">
        <Link href="/">Trang chủ</Link> /<Link href="/blog">Tin tức</Link> /
        <p className="sm:max-w-[400px] max-w-[calc(100vw-200px)]  text-ellipsis overflow-hidden whitespace-nowrap ">
          {data.title}
        </p>
      </div>

      <h1 className="mt-8 text-center mb-12">{data.title}</h1>
      <article
        id="blog_page-detail"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></article>

      <div className="flex justify-center">
        <button className="font-bold mt-3">
          <Link href="/blog">Xem thêm...</Link>
        </button>
      </div>
    </main>
  );
};

export default BlogDetail;
