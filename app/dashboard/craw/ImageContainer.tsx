"use client";
import React, { useState } from "react";
import ImageItem from "./ImageItem";
import { nanoid } from "@reduxjs/toolkit";
import { deleteFileUpload, uploadFileSever } from "@/app/sevices/untils";
import Link from "next/link";

export interface IImageUpload {
  url: string;
  path: string;
}
interface ImageContainerProps {
  listImage: string[];
  isCloseGuild?: boolean;
  setListImageUpload: (value: any) => any;
  listImageUpload: IImageUpload[];
}
const ImageContainer: React.FC<ImageContainerProps> = ({
  listImage,
  isCloseGuild = false,
  setListImageUpload,
  listImageUpload,
}) => {
  const [listImageSS, setListInmage] = useState(listImage);
  const handleUploadImage = (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      uploadFileSever(file).then((data: IImageUpload) => {
        if (data && data.url) {
          setListImageUpload((prev: any[]) => {
            return [...prev, { url: data.url, path: data.path }];
          });
        }
      });
    }
  };

  const handleDeletefile = async (path: string) => {
    if (path) {
      setListImageUpload((prev: any) => {
        return prev.filter((item: any) => item.path != path) || [];
      });
    }
    path && (await deleteFileUpload(path));
  };
  return (
    <>
      {listImageSS.length > 0 && (
        <h2 className="text-color-head text-center  mt-16 mb-8">
          Danh sách ảnh có thể sử dụng
        </h2>
      )}
      <section className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4">
        {listImageSS.map((img) => (
          <ImageItem
            setListInmage={setListInmage}
            img={img}
            path={""}
            key={nanoid()}
          />
        ))}
      </section>
      <hr className="mt-8" />
      {listImageUpload && listImageUpload.length > 0 && (
        <>
          <h3 className="text-color-head text-center  mt-16 mb-8">
            Danh sách ảnh vừa Tải lên
          </h3>

          <section className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4">
            {listImageUpload.map((img) => (
              <ImageItem
                handleDeletefile={handleDeletefile}
                setListInmage={setListImageUpload}
                img={img.url}
                path={img.path}
                key={nanoid()}
              />
            ))}
          </section>
        </>
      )}

      <div className="flex justify-center mt-8 cursor-pointer">
        <label
          htmlFor="uploadimagemore"
          className="bg-red-600 hover:bg-red-800 py-1 px-5 rounded-2xl cursor-pointer"
        >
          Tải ảnh lên từ máy tính
        </label>
      </div>
      {!isCloseGuild && (
        <>
          <div className="text-yellow-500 font-semibold text-xl">Lưy ý</div>
          <ul className="list-disc marker:bg-yellow-300">
            <li>Nhớ chọn danh mục nha kẽo quên</li>
            <li>Nếu nội dung cần nguồn ảnh thì cứ tải từ máy lên</li>

            <li>
              Nếu nội dung ảnh từ bất kỳ nguồn nào chỉ cần (chuột phải: sao chép
              địa chỉ hình ảnh) và định dạng lại như thế này
              linkimage***linkimage{" "}
            </li>
            <li>
              Ví dụ
              linkimagehttps://zecky.online/icons/favicon-32x32.pnglinkimage
            </li>
            <li>Rồi copy dán vào phần nội dung</li>
            <li className="flex gap-2">
              Nguồn ảnh đẹp miễn phí:
              <Link
                target="_blank"
                className="inline-block px-1 font-medium "
                href="https://www.pinterest.com/"
              >
                Pinterest
              </Link>
              <Link
                target="_blank"
                className="inline-block px-1 font-medium "
                href="https://www.pexels.com/vi-vn/"
              >
                Pexels
              </Link>
              <Link
                target="_blank"
                className="inline-block px-1 font-medium "
                href="https://www.imcreator.com/"
              >
                Imcreator
              </Link>
            </li>
          </ul>
        </>
      )}
      <input
        type="file"
        onChange={handleUploadImage}
        id="uploadimagemore"
        className="hidden"
      />
    </>
  );
};

export default ImageContainer;
