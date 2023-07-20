import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { BiDownload } from "react-icons/bi";
const ImageItem: React.FC<{
  img: string;
  path?: string;
  handleDeletefile?: (path: string) => void;
  setListInmage: (prev: any) => any;
}> = ({ img, path, handleDeletefile, setListInmage }) => {
  const handleCopy = (kind: number) => {
    const text = kind == 1 ? img : `linkimage${img}linkimage`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copy thành công!");
      })
      .catch(() => {
        toast.error("Copy thất bại!");
      });
  };
  const divRef = useRef<HTMLDivElement>(null);
  const handleHideBox = () => {
    if (divRef.current) {
      divRef.current.classList.add("hidden");
      setListInmage(
        (prev: any) => prev.filter((item: any) => item != img) || [prev]
      );
      toast.success("Ẩn thành công!");
    }
  };
  const handleDeleteUpLoadImage = () => {
    path && handleDeletefile && handleDeletefile(path);
    if (divRef.current) {
      divRef.current.classList.add("hidden");
    }
  };

  return (
    <div ref={divRef} className="border p-4 relative">
      <button
        onClick={handleHideBox}
        className="absolute -top-3 -right-3 bg-red-500  hover:bg-red-700 rounded-full border px-3"
      >
        X
      </button>
      <Image
        className="w-full h-32 object-cover"
        src={img}
        width={100}
        height={50}
        alt="lỗi ảnh"
      />
      <p className="mt-2 cursor-pointe  text-sm  flex flex-col i">
        <span>Link ảnh:</span>
        <button
          onClick={() => handleCopy(1)}
          className="py-2 px-3 cursor-pointer sm:w-32 mt-2 text-sm rounded-full bg-yellow-600 hover:bg-yellow-800"
        >
          Copy Link
        </button>
      </p>

      <p className="mt-4 cursor-pointer text-sm flex flex-col">
        <span> Ảnh Edit:</span>
        <button
          onClick={() => handleCopy(2)}
          className="py-2 px-3 cursor-pointer  sm:w-32 mt-2 text-sm rounded-full bg-green-600 hover:bg-green-800"
        >
          Copy ảnh edit
        </button>
      </p>
      <p className="my-0">
        {!path && (
          <Link
            download="Tải về máy"
            target="_blank"
            className=" item-center gap-2 text-base inline-flex mt-3"
            href={img}
          >
            <span className="text-2xl">
              {" "}
              <BiDownload />
            </span>
            Tải về máy
          </Link>
        )}
      </p>
      {path && (
        <p className="mt-4 cursor-pointer text-sm flex justify-center flex-col">
          <span> Nhớ xóa nếu không sử dụng nhé!</span>
          <button
            onClick={handleDeleteUpLoadImage}
            className="py-2 px-3 cursor-pointer sm:w-32 mt-2 text-sm rounded-full bg-red-600 hover:bg-red-800 "
          >
            Xóa Ảnh
          </button>
        </p>
      )}
    </div>
  );
};

export default ImageItem;
