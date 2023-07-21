"use client";
import Link from "next/link";
import { IDataBlog } from "../sevices/typedata";

import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Head from "next/head";
import BlogItemSketon from "../component/BlogItemSketon";
import blogController from "../sevices/controller/blogController";
import "./tintuc.scss";
import { removeVietnameseTones } from "../sevices/untils";
import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";
import { BiChevronDown, BiChevronRight, BiX } from "react-icons/bi";
import cateController, {
  ICateCreate,
} from "../sevices/controller/cateController";
import { Header } from "../component";
import { RiEyeLine } from "react-icons/ri";
import ItemDetailViewMore from "../component/ItemDetailViewMore";
let listBlogsData: IDataBlog[] = [];
type Record<Keys extends keyof any, ValueType> = {
  [Key in Keys]: ValueType;
};
function isTextString(text: string) {
  const regex = /^[A-Za-z]+$/;
  return regex.test(text);
}
type IListChar = Record<string, IDataBlog[]>;
export default function Blog() {
  const pageInblog = 10;
  const [listBlogs, setListBlogs] = useState<IDataBlog[]>(listBlogsData);
  const [ListValueChar, setListValueChar] = useState<IListChar>({});
  const [listYear, setListyear] = useState<IListChar>({});
  const [listAuthor, setListAuthor] = useState<IListChar>({});
  const [listCate, setListCate] = useState<ICateCreate[]>([]);
  const [listCateKey, setListCateKey] = useState<IListChar>({});
  const [fillterChar, setFillterChar] = useState<{ kind: string; value: any }>({
    kind: "view",
    value: "sort",
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    blogController.getAllBlogFromSever().then((data) => {
      if (data?.length > 0) {
        setListBlogs(data);
        listBlogsData = data;
      }
    });
    cateController.getAllcate().then(({ listCate }) => {
      if (listCate) {
        setListCate(listCate);
      }
    });
  }, []);
  const handleChangePage = (event: any, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (listBlogs.length <= 0) return;
    const listChars: IListChar = {};
    const listYears: IListChar = {};
    const listAuthor: IListChar = {};
    const listCateKey: IListChar = {};
    listBlogs.forEach((item) => {
      const year = moment(item.createdAt).format("YYYY");
      const cateKey = item.category.cate;
      if (listCateKey[cateKey]) {
        listCateKey[cateKey].push(item);
      } else {
        listCateKey[cateKey] = [item];
      }
      const authorName = item.author.fullname;
      if (listAuthor[authorName]) {
        listAuthor[authorName].push(item);
      } else {
        listAuthor[authorName] = [item];
      }
      if (listYears[year]) {
        listYears[year].push(item);
      } else {
        listYears[year] = [item];
      }
      const key = isTextString(item.title[0])
        ? removeVietnameseTones(item.title[0].toLowerCase())
        : removeVietnameseTones(item.title[1].toLowerCase());
      if (key) {
        if (listChars[key]) {
          listChars[key].push(item);
        } else {
          listChars[key] = [item];
        }
      }
    });
    setListValueChar(listChars);
    setListyear(listYears);
    setListAuthor(listAuthor);
    setListCateKey(listCateKey);
  }, [listBlogs.length]);

  let listBlogFillter: IDataBlog[] = [];
  switch (fillterChar.kind) {
    case "char":
      listBlogFillter = ListValueChar[fillterChar.value];
      break;
    case "sort":
      if (fillterChar.value == "sortOldCreate") {
        listBlogFillter = listBlogs.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        break;
      } else if (fillterChar.value == "sortNewCreate") {
        listBlogFillter = listBlogs.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        break;
      }
    case "view":
      listBlogFillter = listBlogs.sort((a, b) => b.view - a.view);
      break;
    case "author":
      listBlogFillter = listBlogs.filter(
        (item) => item.author.fullname == fillterChar.value
      );
      break;
    case "year":
      listBlogFillter = listBlogs.filter(
        (item) => moment(item.createdAt).format("YYYY") == fillterChar.value
      );
      break;
    case "category":
      listBlogFillter = listBlogs
        .filter((item) => item.category.cate == fillterChar.value)
        .sort((a, b) => b.view - a.view);
      break;
    default:
      listBlogFillter = listBlogs;
  }
  let totalPage = Math.ceil(listBlogFillter.length / pageInblog);
  const currentPageFormat = currentPage > totalPage ? 1 : currentPage;
  let listBlogInPage = listBlogFillter?.length
    ? listBlogFillter.slice(
        (currentPageFormat - 1) * pageInblog,
        currentPageFormat * pageInblog
      )
    : [];

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  return (
    <main>
      <Head>
        <title>Tổng hợp tin tức hay tại Zecky</title>
        <meta
          name="description"
          content="Tổng hợp tin tức hay tâm huyết tại Zecky, Hãy tham gia zecky để sử dụng ChatGPT phiên bản mới nhất, hoàn toàn miễn phí nhé!"
        />
      </Head>
      <Header listMenu={listCate} />
      <div className="menu text-white text-sm mb-4 flex justify-between items-center gap-1  text-ellipsis overflow-hidden whitespace-nowrap">
        <nav className="flex items-center gap-1">
          <Link className="capitalize" href="/">
            Trang chủ
          </Link>
          <BiChevronRight />
          <Link className="capitalize last_child" href={`/tin-tuc`}>
            tin tức
          </Link>
        </nav>
      </div>
      <h1 className="text-center mb-8">Tổng hợp tin tức hay tại Zecky</h1>
      <section
        onClick={() => setIsOpenFilter(!isOpenFilter)}
        className={`text-right text-sm flex items-center justify-end mb-1 gap-1 cursor-pointer ${
          isOpenFilter ? "" : "pb-4"
        }`}
      >
        Lọc tin tức{" "}
        <p className="text-xl ">
          {!isOpenFilter ? <BiChevronDown /> : <BiX />}
        </p>
      </section>
      {isOpenFilter && (
        <>
          <section className="sm:flex gap-4">
            <select
              onChange={(e) =>
                setFillterChar(() => ({ kind: "sort", value: e.target.value }))
              }
              className="select_filter"
            >
              <option value="sortViewMax">Sắp xếp </option>
              <option value="sortNewCreate">Mới nhất </option>
              <option value="sortOldCreate">Cũ nhất </option>
              <option value="sortViewMax">Xem nhiều </option>
            </select>
            <select
              onChange={(e) =>
                setFillterChar(() => ({
                  kind: "category",
                  value: e.target.value,
                }))
              }
              className="select_filter"
            >
              <option value={listCate[0].slug}>Danh mục </option>
              {Object.keys(listCateKey).map((cate) => (
                <option key={nanoid()} className="capitalize" value={cate}>
                  {cate}
                </option>
              ))}
            </select>
            <select
              onChange={(e) =>
                setFillterChar(() => ({
                  kind: "author",
                  value: e.target.value,
                }))
              }
              className="select_filter"
            >
              <option value="">Tác giả </option>
              {Object.keys(listAuthor).map((cate) => (
                <option className="capitalize" key={nanoid()} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
            <select
              onChange={(e) =>
                setFillterChar(() => ({ kind: "year", value: e.target.value }))
              }
              className="select_filter"
            >
              <option value="2023">Năm </option>
              {Object.keys(listYear).map((year) => (
                <option key={nanoid()} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </section>
          <section>
            <ul className="letterFillter flex mb-2 flex-wrap mt-1">
              <li
                onClick={() => setFillterChar({ kind: "view", value: "sort" })}
                className=""
              >
                <span>All</span>
              </li>
              {Object.keys(ListValueChar).map((key) => (
                <li
                  onClick={() => setFillterChar({ kind: "char", value: key })}
                  key={key}
                  className="capitalize"
                >
                  <span>{key}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {listBlogInPage.map((blog) => (
          <ItemDetailViewMore key={blog._id} blog={blog} />
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
      {totalPage > 1 && (
        <section className="text-white panation flex justify-center mt-4">
          <Pagination
            onChange={handleChangePage}
            color="secondary"
            count={totalPage}
            page={currentPage}
            defaultPage={1}
            boundaryCount={totalPage > 10 ? 2 : 1}
          />
        </section>
      )}
    </main>
  );
}
