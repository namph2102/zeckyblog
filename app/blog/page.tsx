"use client";
import Link from "next/link";
import { getAllBlog } from "../sevices/untils";
import { IData } from "../sevices/typedata";
import Image from "next/image";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Head from "next/head";
import BlogItemSketon from "../component/BlogItemSketon";

export default function Blog() {
  const [listBlogs, setListBlogs] = useState<IData[]>([]);
  const [infoPage, setInfoPage] = useState({
    totalPage: 0,
    currentPage: 1,
    pageInblog: 10,
  });
  useEffect(() => {
    getAllBlog().then((data) => {
      if (data?.length > 0) {
        setListBlogs(data);
        setInfoPage((prev) => ({
          ...prev,
          totalPage: Math.ceil(data.length / infoPage.pageInblog),
        }));
      }
    });
  }, []);
  const handleChangePage = (event: any, page: number) => {
    setInfoPage((prev) => ({ ...prev, currentPage: page }));
  };

  const listBlogInPage = listBlogs.slice(
    (infoPage.currentPage - 1) * infoPage.pageInblog,
    infoPage.currentPage * infoPage.pageInblog
  );

  return (
    <main>
      <Head>
        <title>Danh sách bài viết hay tại Zecky 👈👈👈</title>
        <meta
          name="description"
          content="Tổng hợp bài viết tâm huyết tại Zecky, Hãy tham gia zecky để sử dụng ChatGPT phiên bản mới nhất, hoàn toàn miễn phí nhé!"
        />
      </Head>
      <div className="menu text-white text-sm mb-4 flex items-center gap-1  text-ellipsis overflow-hidden whitespace-nowrap">
        <Link href="/">Trang chủ</Link> /<p>Tin tức</p>
      </div>
      <h1 className="text-center mb-8">Danh sách bài viết tại Zecky👈</h1>
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
      {listBlogs.length <= 0 && (
        <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
          <BlogItemSketon />
        </section>
      )}
      {infoPage.totalPage > 1 && (
        <section className="text-white panation flex justify-center mt-4">
          <Pagination
            onChange={handleChangePage}
            color="secondary"
            count={infoPage.totalPage}
            page={infoPage.currentPage}
            defaultPage={1}
            boundaryCount={infoPage.totalPage > 10 ? 2 : 1}
          />
        </section>
      )}
    </main>
  );
}
