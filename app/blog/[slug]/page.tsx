import { IData } from "@/app/sevices/typedata";
import { getData, getDataDetail } from "@/app/sevices/untils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
interface Fulldata extends IData {
  createdAt: string;
  updatedAt: string;
}
import React, { FC } from "react";
interface ParamsBlog {
  params: { slug: string };
}
const domainsever = process.env.DOMAIN_URL || "https://zecky.online/";
export async function generateMetadata({ params }: ParamsBlog) {
  const data: IData = await getDataDetail(params.slug);
  return {
    title: data.title + " | Zecky",
    description: data.des,
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
      images: data.image,
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
  const schema = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.DOMAIN_URL}/blog/${data.slug}`,
    },
    headline: `${data.title}`,
    description: `${data.des}`,
    image: {
      "@type": "ImageObject",
      url: `${data.image}`,
      width: 700,
      height: 438,
    },
    datePublished: data.createdAt,
    dateModified: data.updatedAt,
    author: {
      "@type": "Person",
      name: "Hoài Nam",
    },
    publisher: {
      "@type": "Organization",
      name: `${process.env.DOMAIN_URL}`,
      logo: {
        "@type": "ImageObject",
        url: "../../favicon.ico",
        width: 70,
        height: 70,
      },
    },
  };

  return (
    <div>
      <Head>
        <meta property="og:url" content={`/blog/${params.slug}`} />
        <meta property="og:image" content={data.image} />
        <meta name="site_path" content="/" />
        <meta name="author" content="zecky.online" />
        <meta property="og:type" content="article" />
        <meta name="og:site_name" content="zecky.online" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta name="keywords" content={data.title} />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="refresh" content="3600" />
        <meta name="Language" content="vi" />
        <meta name="distribution" content="Global" />
        <meta name="revisit-after" content="1 days" />
        <meta property="twitter:image" content={data.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <div className="menu text-white text-sm mb-4 flex items-center gap-1  text-ellipsis overflow-hidden whitespace-nowrap">
        <Link href="/">Trang chủ</Link> /<Link href="/blog">Tin tức</Link> /
        <p className="sm:max-w-[400px] max-w-[calc(100vw-200px)]  text-ellipsis overflow-hidden whitespace-nowrap ">
          {data.title}
        </p>
      </div>

      <h1 className="mt-8 text-center">{data.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: data.content }}></article>
      <figure>
        <figcaption className="text-center">
          <h3>Ảnh Minh Họa</h3>
        </figcaption>
        <Image
          src={data.image}
          alt={data.title}
          width={300}
          height={200}
          className="w-full mt-4"
        />
      </figure>
      <div className="flex justify-center">
        <button className="font-bold mt-3">
          <Link href="/blog">Xem thêm...</Link>
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
