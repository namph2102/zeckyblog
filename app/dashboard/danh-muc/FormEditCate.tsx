import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { RiLink } from "react-icons/ri";
import { ICate } from "./page";
import ImageContainer from "../craw/ImageContainer";
import { deleteFileUpload } from "@/app/sevices/untils";
import adminController from "@/app/sevices/controller/adminController";
import { toast } from "react-hot-toast";
interface FormEditCateProps {
  category: ICate;
  setCateEdit: (cate: any) => void;
  setListCate: (listCate: any) => any;
}
const FormEditCate: React.FC<FormEditCateProps> = ({
  category,
  setCateEdit,
  setListCate,
}) => {
  const [cateNew, setCateNew] = useState(category);
  const [listImageUpload, setListImageUpload] = useState([]);
  console.log(listImageUpload);
  const handleSubmitEdit = async () => {
    let pathImageNew: any = {};
    const {
      slug,
      cate,
      des,
      image = "https://blog.zecky.online/opengraph-image.png",
      _id,
      pathImage,
    } = cateNew;
    if (listImageUpload.length > 0) {
      pathImageNew = listImageUpload.find((i: any) => i.url == image);
    }
    let info = { slug, cate, des, image, pathImage };
    console.log(info);
    console.log(pathImageNew);
    if (pathImageNew && pathImageNew?.path) {
      info.pathImage = pathImageNew?.path;
      if (pathImage) {
        try {
          await deleteFileUpload(pathImage);
        } catch {}
      }
    }
    try {
      await adminController.updateCategory(info, _id);

      setListCate((prev: any) => [
        ...prev.filter((i: any) => i._id !== cateNew._id),
        { ...category, ...cateNew },
      ]);
      toast.success("Thay đổi thành công!");
    } catch {
      toast.error("Thay đổi thất bại!");
    }
    setCateEdit(() => ({}));
  };

  return (
    <div className="m-auto w-[300px] sm:w-[700px] bg-black py-2 px-5 rounded-xl relative">
      <ImageContainer
        isCloseGuild
        setListImageUpload={setListImageUpload}
        listImageUpload={listImageUpload}
        listImage={[]}
      />
      <h4 className="text-center">Thay đổi danh mục</h4>
      <button
        type="button"
        onClick={() => {
          setCateEdit(() => {});
        }}
        className="absolute font-bold top-2 right-2 text-red-600 text-3xl"
      >
        X
      </button>
      <form
        id="form_select"
        className="main__title-form grid grid-cols-2 gap-2 relative"
        action={handleSubmitEdit}
      >
        <div>
          <span>Tên Danh mục</span>
          <input
            value={cateNew.cate}
            onChange={(e) =>
              setCateNew((prev) => ({ ...prev, cate: e.target.value }))
            }
            placeholder="Nhập danh mục.."
            type="text"
          />
        </div>
        <div>
          <span>Slug</span>
          <input
            onChange={(e) =>
              setCateNew((prev) => ({ ...prev, slug: e.target.value }))
            }
            value={cateNew.slug}
            placeholder="Nhập Slug.."
            type="text"
          />
        </div>
        <div className="col-span-2 ">
          <span>Mô tả</span>
          <TextareaAutosize
            value={cateNew.des || "Chưa có mô tả"}
            minRows={2}
            onChange={(e) =>
              setCateNew((prev) => ({ ...prev, des: e.target.value }))
            }
            placeholder="Nhập nội dung"
            className="select_style border-gray-500 border-[1px]"
          />
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <img
            src={cateNew.image}
            alt="error"
            className="h-audo"
            width={300}
            height={100}
          />
        </div>

        <div className="col-span-2 ">
          <span>Link ảnh</span>
          <input
            onChange={(e) =>
              setCateNew((prev) => ({ ...prev, image: e.target.value }))
            }
            value={cateNew.image}
            placeholder="Nhập link ảnh"
            type="text"
          />
        </div>
        <div className="flex justify-center col-span-2">
          <button
            type="submit"
            className="py-1 px-5 bg-green-700 hover:bg-green-800 rounded-xl"
          >
            Thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditCate;
