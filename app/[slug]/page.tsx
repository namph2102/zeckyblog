import { IData, IDataBlog } from "@/app/sevices/typedata";
import { getData, getDataDetail } from "@/app/sevices/untils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import React, { FC } from "react";
interface ParamsBlog {
  params: { slug: string };
}
interface ISlugApi {
  data: IDataBlog;
  listBlogRandom: IDataBlog[];
}
const DOMAIN_HOST = process.env.DOMAIN_URL || "https://blog.zecky.online";
export async function generateMetadata({ params }: ParamsBlog) {
  const { data }: ISlugApi = await getDataDetail(params.slug);
  if (!data) {
    return {};
  }
  return {
    title: data.title + " | Zecky",
    description: data.des,
    keywords: [data.title, ...data.title.split(" ")],
    metadataBase: new URL(`${DOMAIN_HOST}/${data.slug}`),
    authors: ["blog.zecky.online", "zecky.online"],
    creator: data.author.fullname,

    publisher: data.author.fullname,
    alternates: {
      canonical: `${DOMAIN_HOST}/${data.slug}`,
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
      authors: ["zecky.online", "blog.zecky.online", data.author.fullname],
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
  const { data, listBlogRandom }: ISlugApi = await getDataDetail(params.slug);
  if (!data) {
    notFound();
  }
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
          "@id": `${DOMAIN_HOST}/${data.slug}`,
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

      <h1 className="mt-8 text-center sm:mb-12 mb-8 first-letter:uppercase">
        {data.title}
      </h1>
      <article
        id="blog_page-detail"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></article>

      {listBlogRandom && listBlogRandom.length > 0 && (
        <>
          <h2 className="text-center mt-8 mb-4 text-xl font-semibold">
            Một số tin tức liên quan
          </h2>
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 sm:gap-4 gap-6">
            {listBlogRandom.map((blog) => (
              <article key={blog.slug}>
                <Link href={`/${blog.slug}`}>
                  <Image
                    src={blog.image}
                    width={200}
                    height={100}
                    alt="test"
                    className="w-full sm:h-[200px] h-[300px] object-cover"
                  />
                  <h2 className="line-clamp-1 mt-2 px-2">{blog.title}</h2>
                  <p className="indent-3 line-clamp-3 text-base">{blog.des} </p>
                </Link>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
};

export default BlogDetail;
