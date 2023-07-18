import Image from "next/image";
import React, { useRef } from "react";
import toast from "react-hot-toast";
const ImageItem: React.FC<{ img: string }> = ({ img }) => {
  const textHTML = `<figure class="flex items-center flex-col justify-center "><img width="300" height="150" src="${img}" class="sm:max-w-[600px] max-w-full w-auto h-auto object-cover" alt="Ảnh mô tả" /><figcaption class="text-center text-sm my-2 opacity-70">Ảnh minh họa</figcaption></figure>`;
  const handleCopy = (kind: number) => {
    const text = kind == 1 ? img : `**${textHTML}**`;
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
      <p className="mt-2">
        Link ảnh:{" "}
        <button
          onClick={() => handleCopy(1)}
          className="py-2 px-3 text-sm rounded-full bg-yellow-600"
        >
          Copy Link
        </button>
      </p>
      <p className="text-sm break-words">{img}</p>

      <p className="mt-4">
        HTMLCover:{" "}
        <button
          onClick={() => handleCopy(2)}
          className="py-2 px-3 text-sm rounded-full bg-green-600"
        >
          Copy HTML
        </button>
      </p>
      <p className="text-sm break-words">{textHTML}</p>
    </div>
  );
};

export default ImageItem;
