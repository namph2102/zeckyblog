"use client";
import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
import * as cheerio from "cheerio";
import axios from "axios";
import Image from "next/image";
import slugify from "slugify";
import { IData } from "../sevices/typedata";
import Link from "next/link";
import ViewDescription from "./ViewDescription";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ImageItem from "./ImageItem";
import toast from "react-hot-toast";
function isImageLink(url: string) {
  var pattern = /\.(jpeg|jpg|png|svg)$/i;
  return pattern.test(url);
}
function checkImageUrl(url: string) {
  var pattern = /^(http|https):\/\//;
  return pattern.test(url);
}
const CrawWebsite = () => {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState<IData>({
    title: "",
    des: "",
    image: "",
    content: "",
    slug: "",
  });
  const [listImage, setListImage] = useState<string[]>([]);
  useEffect(() => {
    if (!url) return;
    axios
      .get(url)
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
          const paragraphText = $(element).text()?.trim().replace(/\s{2}/, " ");
          const regex = /((http|https):\/\/[^\s]+)/g;
          const links = paragraphText.match(regex);
          if (links && links[0]) {
            links.forEach((link) => {
              if (isImageLink(link)) {
                paragraphs.push(
                  `<figure class="flex items-center flex-col justify-center "><img width="300" height="150" src="${link}" class="sm:max-w-[600px] max-w-full w-auto h-auto object-cover" alt="Ảnh mô tả" /><figcaption class="text-center text-sm my-2 opacity-70">Ảnh minh họa</figcaption></figure>`
                );
              } else
                paragraphs.push(
                  `<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`
                );
            });
          }
          paragraphText && paragraphs.push(`<p>${paragraphText}</p>`);
        });
        if (title && image && des && paragraphs && paragraphs.length > 0) {
          setInfo({
            title: title.trim(),
            image,
            des,
            content: paragraphs.join("").replace(/\s{2}/g, " "),
            slug: slugify(title.toLowerCase().trim().replace(/:/g, "")),
          });
          if (listImageCover && listImageCover?.length > 0) {
            setListImage(Array.from(new Set(listImageCover)));
          }
        }
        toast.success("Lấy thành công nội dung");
      })
      .catch(() => {
        toast.error("Không thể lấy nội dung");
      });
  }, [url]);

  const handleCreateBlog = (info: IData) => {
    if (info.content && info.slug && info.image && info.title) {
      toast("Đang tạo bài viết!", {
        icon: "👏",
      });
      axios
        .post("/api", { method: "POST", body: info })
        .then((res) => res.data)
        .then((data) => {
          setInfo(() => ({
            title: "",
            des: "",
            image: "",
            content: "",
            slug: info.slug,
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
    setInfo(() => ({
      title: "",
      des: "",
      image: "",
      content: "",
      slug: "",
    }));
    const data: any = formData.get("url");
    if (formData.get("url")) {
      setUrl(data);
    }
  };

  return (
    <div>
      <form action={handleSubmitData}>
        <div>
          <TextareaAutosize
            className="text-black py-2 px-4 w-full min-h-[44px]"
            placeholder="Nhập url website"
            name="url"
            minRows={1}
          />
        </div>
        <button className="py-2 mt-2 px-5 bg-green-600" type="submit">
          Lấy nội dung
        </button>
        {info.slug && !info.title && (
          <button type="button" className="ml-2 py-2 mt-2 px-5 bg-red-600">
            <Link target="_blank" href={`/blog/${info.slug}`}>
              Bài viết vừa thêm
            </Link>
          </button>
        )}
      </form>

      {info.title && url && (
        <>
          <p>
            {info.content && info.des && info.slug && info.image && info.title
              ? "Bạn có thể tạo bài viết"
              : "Không nên tạo bài viết"}
          </p>
          <hr />
          <h1 className="text-color-head text-center">{info.title}</h1>
          OenGrap Image:
          {info.image && isImageLink(info.image) && (
            <Image src={info.image} width={300} height={120} alt={info.title} />
          )}
          <p>Description: {info.des}</p>
          <hr />
        </>
      )}
      <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {listImage &&
          listImage.length > 0 &&
          listImage.map((img, index) => <ImageItem img={img} key={index} />)}
      </section>

      {info.content && info.image && url && (
        <ViewDescription handleCreateBlog={handleCreateBlog} data={info} />
      )}
    </div>
  );
};

export default CrawWebsite;
