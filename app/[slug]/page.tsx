import { IData, IDataBlog } from "@/app/sevices/typedata";
import { getData, getDataDetail } from "@/app/sevices/untils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import { BiChevronRight } from "react-icons/bi";
import ShareSocial from "../component/ShareSocial";
import moment from "moment";
import { Header } from "../component";
import { ICateCreate } from "../sevices/controller/cateController";
interface ParamsBlog {
  params: { slug: string };
}
interface ISlugApi {
  data: IDataBlog;
  listBlogRandom: IDataBlog[];
  listCate: ICateCreate[];
}
const DOMAIN_HOST = process.env.DOMAIN_URL || "https://blog.zecky.online";
export async function generateMetadata({ params }: ParamsBlog) {
  const { data }: ISlugApi = await getDataDetail(params.slug);
  if (!data) {
    return {};
  }
  return {
    title: data.title,
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
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.des,
      siteId: "1646660186759892992",
      creator: "blog.zecky.online",
      creatorId: "1646660186759892992",
      images: [data.image],
    },
    openGraph: {
      title: data.title,
      description: data.des,
      images: {
        url: data.image,
        alt: data.title,
      },
      type: "article",
      publishedTime: data.updatedAt,
      authors: ["zecky.online", "blog.zecky.online"],
    },
    robots: {
      index: true,
      follow: true,

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
  const { data, listBlogRandom, listCate }: ISlugApi = await getDataDetail(
    params.slug
  );
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
      ratingCount: `${listBlogRandom.length}`,
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
      <Header listMenu={listCate} />
      <div className="menu text-white text-sm mb-4 flex justify-between items-center gap-1  text-ellipsis overflow-hidden whitespace-nowrap">
        <nav className="flex items-center gap-1">
          <Link className="capitalize sm:block hidden" href={`/`}>
            Trang chủ
          </Link>
          <span className="sm:block hidden">
            <BiChevronRight />
          </span>
          <Link className="capitalize" href={`/danh-muc/${data.category.slug}`}>
            {data.category.cate}
          </Link>
          <BiChevronRight />
          <Link className="capitalize last_child" href={`/tin-tuc`}>
            tin tức
          </Link>
        </nav>
        <div className="datetime text-xs">
          {" "}
          {moment(data.createdAt).format("hh:mm:ss - DD/MM/YYYY")}
        </div>
      </div>

      <h1 className="mt-8 text-center  first-letter:uppercase">{data.title}</h1>
      <ShareSocial link={DOMAIN_HOST + "/" + data.slug} />
      <article
        id="blog_page-detail"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></article>
      <p
        title="Tác giả"
        className="flex font-normal capitalize text-sm justify-end text-white"
      >
        {data.author.fullname}
      </p>
      <ShareSocial isTextShare link={DOMAIN_HOST + "/" + data.slug} />
      {listBlogRandom && listBlogRandom.length > 0 && (
        <>
          <h2 className="text-center mt-8 mb-4 text-2xl font-semibold">
            Tin tức liên quan
          </h2>
          <section
            id="blog_more"
            className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 sm:gap-4 gap-6"
          >
            {listBlogRandom.map((blog) => (
              <article key={blog.slug}>
                <Link href={`/${blog.slug}`}>
                  <Image
                    src={blog.image}
                    width={200}
                    height={100}
                    alt={blog.title}
                    className="w-full sm:h-[200px] h-[300px] object-cover"
                  />
                  <h3 className="line-clamp-1 mt-2 pb-0 text-[16px] sm:text-[18px]">
                    {blog.title}
                  </h3>
                  <p className="indent-3 line-clamp-3 test-[14px] sm:text-[16px] my-2">
                    {blog.des}{" "}
                  </p>
                </Link>
              </article>
            ))}
          </section>
        </>
      )}
      <p className="text-center flex justify-center mt-4 ">
        <Link className="hover:text-hover" href="/tin-tuc">
          Xem thêm...
        </Link>
      </p>
    </main>
  );
};

export default BlogDetail;
