"use client";
import React, { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { IData } from "../../sevices/typedata";
import Image from "next/image";
import EditorContent from "./EditorContent";
import { DOMAIN_HOST } from "@/app/sevices/untils";
import ShareSocial from "@/app/component/ShareSocial";

interface ViewDescriptionProps {
  data: IData;
  handleCreateBlog: (blog: IData) => void;
  fullname: string;
}

const ViewDescription: React.FC<ViewDescriptionProps> = ({
  data,
  fullname = "Phạm Hoài Nam",
  handleCreateBlog,
}) => {
  const [infoSetting, setInfoSettting] = useState<IData>(data);
  const handleChangeContent = (key: any, value: string) => {
    setInfoSettting((prev: any) => {
      prev[key] = value;
      return { ...prev };
    });
  };
  const handleSubmit = () => {
    const blogNew = infoSetting;
    handleCreateBlog(blogNew);
  };
  const handleChangecontentEditor = (value: string) => {
    handleChangeContent("content", value);
  };
  return (
    <div id="blog_page-detail" className="my-2">
      <hr className="my-4" />
      <h2 className="text-center mt-4">Chỉnh sửa định dạng</h2>
      <h4>Tiêu đề</h4>
      <TextareaAutosize
        value={infoSetting.title}
        className="w-full px-2 py-1 text-black"
        onChange={(e) => handleChangeContent("title", e.target.value)}
      />
      <hr className="my-4" />
      <h4>Slug</h4>
      <TextareaAutosize
        value={infoSetting.slug}
        onChange={(e) => handleChangeContent("slug", e.target.value)}
        className="w-full px-2 py-1 text-black"
      />
      <hr className="my-4" />

      <h4>Mô tả SEO</h4>
      <TextareaAutosize
        value={infoSetting.des}
        onChange={(e) => handleChangeContent("des", e.target.value)}
        className="w-full px-2 py-1 text-black"
      />
      <hr className="my-4" />
      <h4>Ảnh SEO</h4>
      <Image
        className="w-full h-auto object-cover"
        src={infoSetting.image}
        width={300}
        height={120}
        alt={infoSetting.title}
      />
      <TextareaAutosize
        onChange={(e) => handleChangeContent("image", e.target.value)}
        value={infoSetting.image}
        className="w-full px-2 py-1 text-black"
      />
      <hr className="my-4" />
      <h2 className="text-center my-4 font-bold">Chỉnh sửa nội dung</h2>
      <EditorContent
        title={infoSetting.title}
        text={infoSetting.content}
        setText={handleChangecontentEditor}
      />

      <hr className="h-2" />

      <h2 className="text-center mt-12">Nội dung sẽ được tạo</h2>
      <h1 className="mt-8 text-center  first-letter:uppercase">
        {infoSetting.title}
      </h1>
      <ShareSocial link={`${DOMAIN_HOST + "/" + infoSetting.slug}`} />
      {infoSetting.content && (
        <article
          id="blog_page-detail"
          dangerouslySetInnerHTML={{ __html: infoSetting.content }}
        ></article>
      )}
      <p
        title="Tác giả"
        className="flex font-bold justify-end text-white capitalize"
      >
        {fullname}
      </p>

      <ShareSocial
        link={`${DOMAIN_HOST + "/" + infoSetting.slug}`}
        isTextShare
      />

      <div className="flex justify-center">
        <button
          type="button"
          className="py-2 px-5 bg-green-600 hover:bg-green-900 my-3 rounded-full"
          onClick={handleSubmit}
        >
          Tạo Trang Blog
        </button>
      </div>
    </div>
  );
};

export default ViewDescription;
