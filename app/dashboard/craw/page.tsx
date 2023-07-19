"use client";
import React, { useCallback, useEffect, useState } from "react";
export const dynamic = "force-dynamic";
import * as cheerio from "cheerio";
import axios from "axios";
import Image from "next/image";
import slugify from "slugify";
import { IData } from "../../sevices/typedata";

import ViewDescription from "./ViewDescription";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ImageItem from "./ImageItem";
import toast from "react-hot-toast";
import { DOMAIN_HOST, removeVietnameseTones } from "../../sevices/untils";
import blogController from "../../sevices/controller/blogController";
import { useSelector } from "react-redux";
import { RootState } from "@/app/sevices/store";
import LoginDashBoard from "../component/LoginDashBoard";
import "./blogdetail.scss";

import CateGorySelect from "./CategorySelect";
function isImageLink(url: string) {
  var pattern = /\.(jpeg|jpg|png|svg)$/i;
  return pattern.test(url);
}
function checkImageUrl(url: string) {
  var pattern = /^(http|https):\/\//;
  return pattern.test(url);
}
const CrawWebsite = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const [category, setCategory] = useState({ value: "", label: "" });
  const infoInitValue: IData = {
    title: "",
    des: "",
    image: "",
    content: "",
    slug: "",
    author: account._id,
    category: category.value,
    pathImage: "",
  };

  const [url, setUrl] = useState("");

  const [info, setInfo] = useState<IData>(infoInitValue);
  const [listImage, setListImage] = useState<string[]>([]);

  const handleCrawLink = useCallback(
    (linkCraw: string) => {
      if (!linkCraw) return;
      axios
        .get(linkCraw)
        .then((res) => {
          const $ = cheerio.load(res.data);
          const title = $("h1").text() || $("title").text();
          const image = $('meta[property="og:image"]').attr("content");
          const des = $('meta[name="description"]').attr("content");
          const listImageCover: string[] = [];
          $("img[src]").each((i, img) => {
            const src = $(img).attr("src");

            if (src && checkImageUrl(src)) {
              listImageCover.push(src);
            }
          });

          const paragraphs: any = [];
          $("p").each((index, element) => {
            const paragraphText = $(element)
              .text()
              ?.trim()
              .replace(/\s{2}/, " ");
            const regex = /((http|https):\/\/[^\s]+)/g;
            const links = paragraphText.match(regex);
            if (links && links[0]) {
              links.forEach((link) => {
                if (isImageLink(link)) {
                  paragraphs.push(`linkimage${link}linkimage`);
                } else
                  paragraphs.push(
                    `<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`
                  );
              });
            }
            paragraphText && paragraphs.push(`<p >${paragraphText}</p>`);
          });
          if (title && image && des && paragraphs && paragraphs.length > 0) {
            setInfo((prev) => ({
              ...prev,
              title: title.trim(),
              image,
              des,
              content: paragraphs.join("").replace(/\s{2}/g, " "),
              slug: slugify(
                removeVietnameseTones(title)
                  .replace(/[^\w\s]/g, "")
                  .toLowerCase()
              ),
            }));
            if (listImageCover && listImageCover?.length > 0) {
              setListImage(Array.from(new Set(listImageCover)));
            }
          }
          toast.success("Lấy thành công nội dung");
        })
        .catch(() => {
          toast.error("Không thể lấy nội dung");
        });
    },
    [url]
  );

  const handleCreateBlog = (info: IData) => {
    if (info.content && info.slug && info.image && info.title) {
      toast("Đang tạo bài viết!", {
        icon: "👏",
      });
      const coverData = info;
      coverData.slug = info.slug.trim();
      coverData.des = info.des.trim();
      coverData.title = info.title.trim();
      coverData.image = info.image.trim();

      blogController
        .createNewblog(coverData)
        .then((data) => {
          setInfo(() => ({
            ...infoInitValue,
            slug: coverData.slug,
            author: account._id,
          }));
          toast.success(data.message);
          setUrl(() => "");
          setListImage(() => []);
        })
        .catch(() => {
          toast.error("Thêm thất bại!");
        });
    } else {
      toast.error("Thiếu dữ liệu rồi vui lòng kiểm tra lại");
    }
  };
  const handleSubmitData = async (formData: FormData) => {
    setInfo(() => infoInitValue);
    const data: any = formData.get("url");
    if (data && checkImageUrl(data)) {
      handleCrawLink(data);
      setUrl(data);
    } else {
      toast.error("Đây không phải là đường dẫn đúng!");
    }
  };
  const handleOpenNewWindown = (slug: string) => {
    const url = DOMAIN_HOST + "/" + slug;
    const windowName = "Xem trang";
    const windowFeatures = "width=800,height=600";
    window.open(url, windowName, windowFeatures);
  };
  if (!account.fullname && account.permission === "member")
    return <LoginDashBoard />;

  return (
    <div className="my-2">
      <section className="my-3 border_line-style  border-b-2">
        <h1>Tạo bài viết</h1>
      </section>
      {!category.label && <CateGorySelect setNewCatogory={setCategory} />}
      {category.label && (
        <>
          <h2 className="text-center">
            Danh mục: <span className="capitalize">{category.label}</span>
          </h2>
        </>
      )}
      {account._id && category.value && (
        <form action={handleSubmitData}>
          <div className="mt-3">
            <TextareaAutosize
              className="text-black py-2 px-4 min-h-[38px] w-full "
              placeholder="Nhập url website"
              name="url"
              minRows={1}
            />
          </div>
          <button className="py-2 mt-2 px-5 bg-green-600" type="submit">
            Lấy nội dung
          </button>
          {info.slug && !info.title && (
            <button
              onClick={() => handleOpenNewWindown(info.slug)}
              type="button"
              className="ml-2 py-2 mt-2 px-5 bg-red-600"
            >
              Bài viết vừa thêm
            </button>
          )}
        </form>
      )}

      {info.title && url && (
        <>
          <p>
            {info.content && info.des && info.slug && info.image && info.title
              ? "Bạn có thể tạo bài viết này"
              : "Không nên tạo bài viết"}
          </p>
          <hr />
        </>
      )}
      {listImage && listImage.length > 0 && (
        <h2 className="text-color-head text-center capitalize py-16">
          Danh sách ảnh có thể sử dụng
        </h2>
      )}

      <section className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4">
        {listImage &&
          listImage.length > 0 &&
          listImage.map((img, index) => <ImageItem img={img} key={index} />)}
      </section>
      <hr className="h-4 bg-white" />
      <section className="container mx-auto">
        <h1 className="text-color-head text-center capitalize my-4">
          {info.title}
        </h1>
        {info.content && info.image && url && (
          <ViewDescription handleCreateBlog={handleCreateBlog} data={info} />
        )}
      </section>
    </div>
  );
};

export default CrawWebsite;
