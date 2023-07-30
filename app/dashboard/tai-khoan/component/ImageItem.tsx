import accountController from "@/app/sevices/controller/accountController";
import React, { useState, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { BiXCircle } from "react-icons/bi";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface ImageItemProps {
  url: string;
  idComment: string;
  fileName: string;
  path: string;
}
const ImageItem: React.FC<ImageItemProps> = ({
  url,
  idComment,
  path,
  fileName,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);
  const divRef = useRef<HTMLDivElement>(null);
  const handleDeleteImage = () => {
    accountController
      .deleteOneDocument(idComment, path, fileName)
      .then((message) => {
        toast.success(message);
        if (divRef.current) {
          divRef.current.classList.add("hidden");
        }
      })
      .catch(() => {
        toast.error("Xóa ảnh thất bại");
      });
  };
  return (
    <div ref={divRef} className="relative">
      <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
        <img
          className="object-cover w-10 h-10"
          width={60}
          height={60}
          alt="error"
          src={url}
        />
      </ControlledZoom>
      <button
        onClick={handleDeleteImage}
        className="text-xl  rounded-full absolute -top-2 text-yellow-500 -left-2 flex item-center justify-center  "
      >
        <BiXCircle />
      </button>
    </div>
  );
};

export default ImageItem;
