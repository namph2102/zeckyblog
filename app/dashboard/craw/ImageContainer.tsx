"use client";
import React, { useState } from "react";
import ImageItem from "./ImageItem";
import { nanoid } from "@reduxjs/toolkit";
import { deleteFileUpload, uploadFileSever } from "@/app/sevices/untils";
interface ImageContainerProps {
  listImage: string[];
}
interface IImage {
  url: string;
  path: string;
}
const ImageContainer: React.FC<ImageContainerProps> = ({ listImage }) => {
  const [listImageUpload, setListImageUpload] = useState<IImage[]>([]);
  const [listImageSS, setListInmage] = useState(listImage);
  const handleUploadImage = (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      uploadFileSever(file).then((data: IImage) => {
        if (data && data.url) {
          setListImageUpload((prev) => {
            return [...prev, { url: data.url, path: data.path }];
          });
        }
      });
    }
  };
  const handleDeletefile = async (path: string) => {
    if (path) {
      setListImageUpload((prev) => {
        return prev.filter((item) => item.path != path) || [];
      });
    }
    path && (await deleteFileUpload(path));
  };
  return (
    <>
      <h2 className="text-color-head text-center  mt-16 mb-8">
        Danh sách ảnh có thể sử dụng
      </h2>
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
      {listImageUpload && listImageUpload.length > 0 && (
        <>
          <hr className="h-2 my-2 bg-white" />
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

      <div className="flex justify-center my-4 cursor-pointer">
        <label
          htmlFor="uploadimagemore"
          className="bg-red-600 hover:bg-red-800 py-1 px-5 rounded-2xl cursor-pointer"
        >
          Tải ảnh lên từ máy tính
        </label>
      </div>
      <input
        type="file"
        onChange={handleUploadImage}
        id="uploadimagemore"
        className="hidden"
      />
      <hr className="h-2 my-2 bg-white" />
    </>
  );
};

export default ImageContainer;
