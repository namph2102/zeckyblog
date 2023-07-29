import React, { useRef } from "react";
import { Tooltip } from "@mui/material";
import { BiEditAlt } from "react-icons/bi";
import { checkImageUrl, componentsProps } from "@/app/sevices/untils";
import { ICate } from "./page";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import adminController from "@/app/sevices/controller/adminController";

interface CategoryItemProps {
  cate: ICate;
  setCateEdit: (cate: any) => void;
  setListCate: (listCate: any) => any;
}
const CategoryItem: React.FC<CategoryItemProps> = ({
  cate,
  setCateEdit,
  setListCate,
}) => {
  const trElement = useRef<any>(null);
  const handleDeleteCate = async () => {
    const result = confirm(
      cate.count > 0
        ? "Bạn không thẻ xóa được?"
        : "Bạn có thể xóa danh mục này?"
    );
    if (result) {
      if (cate.count <= 0) {
        if (trElement.current) {
          trElement.current.classList.add("hidden");

          try {
            await adminController.deleteCategory(cate._id);
            toast.success("Xóa danh mục thành công");

            setListCate((prev: any[]) =>
              prev.filter((c: any) => c._id !== cate._id)
            );
          } catch {
            toast.error("Xóa danh mục thất bại");
          }
        }
      } else {
        toast.error("Bạn không thể xóa danh mục này");
      }
    }
  };
  return (
    <tr ref={trElement} className="text-center">
      <td>
        <span className=" px-4 py-2 capitalize max-w-[100px] inline-block">
          {cate.cate}
        </span>
      </td>
      <td>
        <span className=" px-4 py-2 max-w-[100px] inline-block">
          {cate.slug}
        </span>
      </td>
      <td>
        <span className="px-4 py-2  line-clamp-2 overflow-hidden text-center">
          {cate.des || "Chưa có"}
        </span>
      </td>
      <td>
        <span className="px-4 py-2 ">
          <img
            src={
              !checkImageUrl(cate.image)
                ? "https://blog.zecky.online/opengraph-image.png"
                : cate.image
            }
            width={100}
            height={200}
            alt="error"
          />
        </span>
      </td>
      <td>
        <span className=" whitespace-nowrap px-4 py-2 capitalize">
          {cate.author.fullname}{" "}
        </span>
      </td>

      <td>
        <span className=" whitespace-nowrap px-4 py-2">
          {moment(cate.createdAt).format("HH:mm:ss - DD/MM/YYYY")}
        </span>
      </td>
      <td>
        <span className=" whitespace-nowrap px-4 py-2">{cate.count}</span>
      </td>
      <td>
        <span className="flex gap-2 text-xl">
          <Tooltip
            componentsProps={componentsProps}
            arrow
            title="Chỉnh sửa tài khoản"
          >
            <button
              onClick={() => {
                setCateEdit(() => cate);
              }}
              className="bg-blue-600/20 hover:bg-blue-600/50 p-2 rounded-full  text-blue-500"
            >
              <BiEditAlt />
            </button>
          </Tooltip>

          <Tooltip
            componentsProps={componentsProps}
            arrow
            title="Chỉnh sửa tài khoản"
          >
            <button
              onClick={handleDeleteCate}
              className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
            >
              <RiDeleteBin6Line />
            </button>
          </Tooltip>
        </span>
      </td>
    </tr>
  );
};

export default CategoryItem;
