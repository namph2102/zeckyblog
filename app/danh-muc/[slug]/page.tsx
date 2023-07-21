import { IData, IDataBlog } from "@/app/sevices/typedata";
import { getData, capitalizeText } from "@/app/sevices/untils";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import { BiChevronRight } from "react-icons/bi";

import moment from "moment";
import cateController, {
  ICateData,
} from "@/app/sevices/controller/cateController";
import ShareSocial from "@/app/component/ShareSocial";
import { Header } from "@/app/component";
import ItemDetailViewMore from "@/app/component/ItemDetailViewMore";

interface ParamsBlog {
  params: { slug: string };
}
interface ISlugApi {
  data: ICateData;
  listBlogRandom: IDataBlog[];
  listCate: ICateData[];
}
const DOMAIN_HOST = process.env.DOMAIN_URL || "https://blog.zecky.online";
export async function generateMetadata({ params }: ParamsBlog) {
  const { data }: ISlugApi = await cateController.getCateDetail(params.slug);
  if (!data) {
    return {};
  }
  const titleCover = `Tin tức về ${capitalizeText(data.cate)} | Zecky`;
  return {
    title: titleCover,
    description: data.des,
    keywords: [data.cate],
    metadataBase: new URL(`${DOMAIN_HOST}/${data.slug}`),
    authors: ["blog.zecky.online", "zecky.online"],

    alternates: {
      canonical: `${DOMAIN_HOST}/danh-muc/${data.slug}`,
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
        "vi-VN": "/vi-VN",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: titleCover,
      description: data.des,
      siteId: "1646660186759892992",
      creator: "blog.zecky.online",
      creatorId: "1646660186759892992",
      images: [data.image],
    },
    openGraph: {
      title: titleCover,
      description: data.des,
      images: {
        url: data.image,
        alt: titleCover,
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
  const res = await cateController.getAllcate();
  const listCate: ICateData[] = await res.listCate;
  const path = listCate.map(({ slug }) => ({
    slug,
  }));

  return path;
}

const BlogDetail: FC<ParamsBlog> = async ({ params }) => {
  const { data, listBlogRandom, listCate }: ISlugApi =
    await cateController.getCateDetail(params.slug);
  if (!data) {
    notFound();
  }
  const listCateCover = listCate.map((item, index) => ({
    "@type": "ListItem",
    position: index + 3,
    item: {
      "@id": `${DOMAIN_HOST}/${item.slug}`,
      name: `✅${`${item.cate}`}`,
    },
  }));
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
      ...listCateCover,
    ],
  };
  const schema2 = {
    "@context": "http://schema.org/",
    "@type": "Book",
    name: `${data.cate}`,
    description: data.des,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      ratingCount: `${listCate.length}`,
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
          <Link className="capitalize" href={`/`}>
            Trang chủ
          </Link>
          <BiChevronRight />
          <Link className="capitalize" href={`/danh-muc/${data.slug}`}>
            Danh mục
          </Link>
          <BiChevronRight />
          <Link
            className="capitalize last_child"
            href={`/danh-muc/${data.slug}`}
          >
            {data.cate}
          </Link>
        </nav>
        <div className="datetime text-xs">
          {" "}
          {moment(data.createdAt).format("hh:mm:ss - DD/MM/YYYY")}
        </div>
      </div>
      <h1 className="text-center mt-8 ">
        Tin tức về &quot;<span className="capitalize">{data.cate}</span>&quot;
        nổi bật tại Zecky 👈👈
      </h1>
      <ShareSocial link={`${DOMAIN_HOST + "/tim-kiem"}`} />
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {listBlogRandom.map((blog) => (
          <ItemDetailViewMore key={blog._id} blog={blog} />
        ))}
      </section>
      <p className="text-center flex justify-center mt-4 text-white">
        <Link className="hover:text-hover" href="/tin-tuc">
          Xem thêm...
        </Link>
      </p>
    </main>
  );
};

export default BlogDetail;
