"use client";
import React, { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { IData } from "../../sevices/typedata";
import Image from "next/image";
import EditorContent from "./EditorContent";
import {
  CreateSlug,
  DOMAIN_HOST,
  deleteFileUpload,
} from "@/app/sevices/untils";
import ShareSocial from "@/app/component/ShareSocial";
import ImageContainer, { IImageUpload } from "./ImageContainer";

interface ViewDescriptionProps {
  data: IData;
  handleCreateBlog: (blog: IData) => void;
  fullname: string;
  isEdit?: boolean;
  listImage: string[];
}

const ViewDescription: React.FC<ViewDescriptionProps> = ({
  data,
  fullname = "Phạm Hoài Nam",
  handleCreateBlog,
  isEdit,
  listImage = [],
}) => {
  const [infoSetting, setInfoSettting] = useState<IData>(data);
  const handleChangeContent = (key: any, value: string) => {
    setInfoSettting((prev: any) => {
      prev[key] = value;
      return { ...prev };
    });
  };
  const [listImageUpload, setListImageUpload] = useState<IImageUpload[]>([]);
  const handleSubmit = () => {
    if (infoSetting.content.includes("img") && listImageUpload.length > 0) {
      const comment = infoSetting.content;
      const regex = /https?:\/\/\S+/gi;
      const urls = comment.match(regex);
      const listPathImageUpload = listImageUpload.map((image) => image.path);
      const listIDUsed: string[] = [];
      if (urls && urls.length > 0) {
        urls.forEach((url) => {
          const regex = /id=([^&]+)/;
          const match = url.match(regex);
          if (match) {
            const id = match[1];
            listIDUsed.push(id);
          } else {
          }
        });
      }
      listIDUsed.forEach((path) => {
        if (listPathImageUpload.includes(path)) {
          listPathImageUpload.splice(listPathImageUpload.indexOf(path), 1);
        }
      });

      listPathImageUpload.forEach(async (path) => await deleteFileUpload(path));
    }

    handleCreateBlog(infoSetting);
  };
  const handleChangecontentEditor = (value: string) => {
    handleChangeContent("content", value);
  };

  return (
    <div id="blog_page-detail" className="my-2">
      <hr className="my-4" />
      <h2 className="text-center my-4 py-2">
        {isEdit ? "Chỉnh sửa định dạng" : "Thêm bài viết mới"}
      </h2>

      <h4>Tiêu đề</h4>
      <TextareaAutosize
        value={infoSetting.title}
        className="w-full px-2 py-1 text-black"
        onChange={(e) => handleChangeContent("title", e.target.value)}
        placeholder="Nhập nội dung tiêu đề"
        maxLength={120}
      />
      {infoSetting.slug && (
        <>
          <hr className="my-4" />
          <h4>Slug</h4>
          <TextareaAutosize
            value={infoSetting.slug || CreateSlug(infoSetting.title)}
            onChange={(e) => handleChangeContent("slug", e.target.value)}
            className="w-full px-2 py-1 text-black"
            placeholder="Đường dẫn url"
            maxLength={600}
          />
        </>
      )}
      <hr className="my-4" />

      <h4>Mô tả SEO</h4>
      <TextareaAutosize
        value={infoSetting.des}
        onChange={(e) => handleChangeContent("des", e.target.value)}
        className="w-full px-2 py-1 text-black"
        placeholder="Mô tả seo"
        minRows={2}
        maxLength={1000}
      />
      <hr className="my-4" />
      <h4>Ảnh SEO</h4>
      {infoSetting.image && (
        <Image
          className="w-full h-auto object-cover"
          src={infoSetting.image}
          width={300}
          height={120}
          alt={infoSetting.title}
        />
      )}
      <TextareaAutosize
        onChange={(e) => handleChangeContent("image", e.target.value)}
        value={infoSetting.image}
        className="w-full px-2 py-1 text-black"
        placeholder="Nhập đường dẫn ảnh"
      />
      <ImageContainer
        listImage={listImage}
        listImageUpload={listImageUpload}
        setListImageUpload={setListImageUpload}
      />
      <hr className="my-4" />
      <h2 className="text-center my-8 font-bold">
        {isEdit ? "Chỉnh sửa nội dung" : "Soạn nội dung"}
      </h2>
      <EditorContent
        title={infoSetting.title}
        text={infoSetting.content}
        setText={handleChangecontentEditor}
      />

      <hr className="h-2" />
      {infoSetting.content ? (
        <>
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
            id="author_write"
            title="Tác giả"
            className="flex font-bold justify-end text-white capitalize text-sm"
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
              {isEdit ? "Chỉnh sửa " : "Tạo "} bài viết
            </button>
          </div>
        </>
      ) : (
        <p className="mb-12"></p>
      )}
    </div>
  );
};

export default ViewDescription;
