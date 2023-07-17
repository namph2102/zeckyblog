import React, { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { IData } from "../sevices/typedata";
import Image from "next/image";
interface ViewDescriptionProps {
  data: IData;
  handleCreateBlog: (blog: IData) => void;
}
// function Debounced(callback: any, delay: number = 200) {
//   delay = delay || 0;
//   let timeId: number | undefined | any;
//   console.log(timeId);
//   return (...args: any) => {
//     console.log(args);
//     if (timeId) {
//       clearTimeout(timeId);
//       timeId = undefined;
//     }
//     timeId = setTimeout(() => {
//       callback(args);

//       clearTimeout(timeId);
//     }, delay);
//   };
// }
const ViewDescription: React.FC<ViewDescriptionProps> = ({
  data,
  handleCreateBlog,
}) => {
  const [infoSetting, setInfoSettting] = useState<IData>(data);
  const handleChangeContent = (key: any, value: string) => {
    setInfoSettting((prev: any) => {
      prev[key] = value;
      return { ...prev };
    });
  };

  const contentCover =
    infoSetting.content
      ?.split("**")
      ?.map((paragraphs) => (paragraphs ? `<p>${paragraphs}</p>` : ""))
      .join("") || "";
  const handleSubmit = () => {
    const blogNew = { ...infoSetting, content: contentCover };
    handleCreateBlog(blogNew);
  };
  return (
    <div className="my-2">
      <hr />
      <h2 className="text-center mt-4">Chỉnh sửa định dạng</h2>
      <h4>Tiêu đề</h4>
      <TextareaAutosize
        value={infoSetting.title}
        className="w-full text-black"
        onChange={(e) => handleChangeContent("title", e.target.value)}
      />
      <hr />
      <h4>Slug</h4>
      <TextareaAutosize
        value={infoSetting.slug}
        onChange={(e) => handleChangeContent("slug", e.target.value)}
        className="w-full text-black"
      />
      <hr />
      <h4>Ảnh</h4>
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
        className="w-full text-black"
      />
      <hr />
      <h4>Nội dung Website</h4>
      <TextareaAutosize
        value={infoSetting.content}
        onChange={(e) => handleChangeContent("content", e.target.value)}
        className="w-full text-black"
      />
      <hr className="h-2" />
      <h2 className="text-center mt-12">Nội dung Website</h2>

      <h1 className="mt-8 text-center">{infoSetting.title}</h1>
      {contentCover && (
        <article dangerouslySetInnerHTML={{ __html: contentCover }}></article>
      )}
      <figure>
        <figcaption className="text-center">
          <h3>Ảnh Minh Họa</h3>
        </figcaption>
        <Image
          src={infoSetting.image}
          alt={infoSetting.title}
          width={300}
          height={200}
          className="w-full mt-4"
        />
      </figure>

      <div className="flex justify-center">
        <button
          type="button"
          className="py-2 px-5 bg-green-600 my-3 rounded-full"
          onClick={handleSubmit}
        >
          Tạo Trang Blog
        </button>
      </div>
      <hr className="h-2 bg-white" />
    </div>
  );
};

export default ViewDescription;
