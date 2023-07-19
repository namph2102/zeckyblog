import Image from "next/image";
import React, { useRef } from "react";
import toast from "react-hot-toast";
const ImageItem: React.FC<{ img: string }> = ({ img }) => {
  const handleCopy = (kind: number) => {
    const text = kind == 1 ? img : `linkimage${img}linkimage`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copy thành công");
      })
      .catch(() => {
        toast.error("Copy thành công");
      });
  };
  const divRef = useRef<HTMLDivElement>(null);
  const handleHideBox = () => {
    if (divRef.current) {
      divRef.current.classList.add("hidden");
      toast.success("Xóa thành công!");
    }
  };
  return (
    <div ref={divRef} className="border p-4 relative">
      <button
        onClick={handleHideBox}
        className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-700 rounded-full border px-3"
      >
        X
      </button>
      <Image
        className="w-full h-auto object-cover"
        src={img}
        width={100}
        height={50}
        alt="lỗi ảnh"
      />
      <p className="mt-2 cursor-pointer">
        Link ảnh:{" "}
        <button
          onClick={() => handleCopy(1)}
          className="py-2 px-3 cursor-pointer text-sm rounded-full bg-yellow-800"
        >
          Copy Link
        </button>
      </p>

      <p className="mt-4 cursor-pointer">
        Ảnh Edit:{" "}
        <button
          onClick={() => handleCopy(2)}
          className="py-2 px-3 cursor-pointer text-sm rounded-full bg-green-800"
        >
          Copy ảnh edit
        </button>
      </p>
    </div>
  );
};

export default ImageItem;
