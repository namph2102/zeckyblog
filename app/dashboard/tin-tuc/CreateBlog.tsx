import React, { useState } from "react";
import ViewDescription from "../craw/ViewDescription";
import { IAccount } from "@/app/sevices/store/slice/AccountSlice";
import CateGorySelect from "../craw/CategorySelect";
import { IData } from "@/app/sevices/typedata";
import blogController from "@/app/sevices/controller/blogController";

import { toast } from "react-hot-toast";
import { CreateSlug, handleOpenNewWindown } from "@/app/sevices/untils";
interface CreateBlogProps {
  account: IAccount;
  setAcction: (value: string) => void;
}
const CreateBlog: React.FC<CreateBlogProps> = ({ account, setAcction }) => {
  const [CategorySelect, setCategorySelect] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "" });
  const infoInitValue: IData = {
    title: "",
    des: "",
    image: "",
    content: ``,
    slug: "",
    author: account._id,
    category: CategorySelect.value,
    pathImage: "",
    source: "",
    keywords: "",
  };
  const [isCreateNewBlog, seyIsCreateNewBlog] = useState(false);
  const [blogCreate, setBlogCreate] = useState<IData>(infoInitValue);

  const [isOpenCateSelect, setIsOpenCateSelect] = useState(false);
  const setCategory = (data: { value: string; label: string }) => {
    setCategorySelect(() => data);
    setBlogCreate((prev) => ({ ...prev, category: data.value }));
    setIsOpenCateSelect(false);
  };
  const handleCreateBlog = async (data: IData) => {
    const info: IData = {
      ...blogCreate,
      ...data,
      category: CategorySelect.value,
      slug: CreateSlug(data.title),
    };

    if (
      info.content &&
      info.slug &&
      info.image &&
      info.title &&
      info.author &&
      info.category
    ) {
      toast("Đang tạo bài viết!", {
        icon: "👏",
      });
      const coverData = info;
      coverData.slug = info.slug?.trim();
      coverData.des = info.des?.trim();
      coverData.title = info.title?.trim();
      coverData.image = info.image?.trim();
      coverData.keywords = info.keywords?.trim().toLowerCase();
      blogController
        .createNewblog(coverData)
        .then((data) => {
          setBlogCreate(() => ({
            ...infoInitValue,
          }));
          handleOpenNewWindown(coverData.slug);
          toast.success(data.message);
          setAcction(`${Math.random() * 4}`);
          seyIsCreateNewBlog(false);
        })
        .catch(() => {
          toast.error("Thêm thất bại!");
        });
    } else {
      if (!info.category) {
        toast.error("Bạn chưa chọn danh mục phù hợp");
      } else {
        toast.error("Thiếu dữ liệu rồi vui lòng kiểm tra lại");
      }
    }
  };
  return (
    <div>
      <button
        className="bg-green-600 hover:bg-green-800 py-1 px-5 rounded-2xl"
        onClick={() => seyIsCreateNewBlog(!isCreateNewBlog)}
      >
        Tạo bài viết
      </button>
      {isCreateNewBlog && (
        <div className="fixed inset-0 bg-main block z-10  scroolbar h-screen  text-base !text-left overflow-y-auto">
          <div className="absolute inset-0">
            <section className="container mx-auto   my-12">
              <button
                onClick={() => seyIsCreateNewBlog(false)}
                className="hover:text-hover text-3xl  fixed top-3 right-0 sm:right-12"
              >
                X
              </button>
              {isOpenCateSelect && (
                <CateGorySelect setNewCatogory={setCategory} />
              )}

              {!isOpenCateSelect && (
                <>
                  <h2 className="text-center">
                    Danh mục:{" "}
                    <span className="capitalize">{CategorySelect.label}</span>
                  </h2>
                  <div className="flex justify-center mb-4 pb-4 ">
                    <button
                      onClick={() => setIsOpenCateSelect(!isOpenCateSelect)}
                      className="text-xs bg-green-500 py-1 px-2 hover:bg-green-800 rounded-full"
                    >
                      Chọn danh mục
                    </button>
                  </div>
                </>
              )}

              <ViewDescription
                listImage={[]}
                data={blogCreate}
                fullname={account.fullname}
                handleCreateBlog={handleCreateBlog}
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
