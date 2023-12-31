import { IData, IDataBlog } from "@/app/sevices/typedata";
import { HandleTimeDiff, handleOpenNewWindown } from "@/app/sevices/untils";
import React, { useState } from "react";
import { BiEditAlt, BiLock, BiLockOpen, BiTrash } from "react-icons/bi";

import ViewDescription from "../craw/ViewDescription";
import { IAccount } from "@/app/sevices/store/slice/AccountSlice";

import CateGorySelect from "../craw/CategorySelect";
import blogController from "@/app/sevices/controller/blogController";
import { toast } from "react-hot-toast";
import moment from "moment";
import { RiEyeLine } from "react-icons/ri";

interface BlogFiedItemProps {
  blog: IDataBlog;
  account: IAccount;
  setAcction: (value: string) => void;
  setListBlog: (prev: any) => any;
}
const BlogFiedItem: React.FC<BlogFiedItemProps> = ({
  blog,
  account,
  setAcction,
  setListBlog,
}) => {
  const [blogEdit, setBlogEdit] = useState<IData>({
    author: account._id,
    category: blog.category._id,
    title: blog.title,
    des: blog.des,
    content: blog.content,
    image: blog.image,
    slug: blog.slug,
    pathImage: blog.image,
    source: blog.source,
    keywords: blog.keywords,
  });
  const handleEdit = async (data: IData) => {
    const dataCover: any = {
      ...blogEdit,
      ...data,
      category: CategorySelect.value,
    };
    delete dataCover["author"];
    dataCover.status = account.permission == "admin";
    blogController.editBlog(dataCover, blog._id).then((message) => {
      toast.success(message);
      setIsOpenEdit(false);
      setListBlog((prev: any) => ({ ...prev, pageinBlog: 7 }));
      setAcction(`${Math.floor(Math.random() * 100)}`);
    });
  };
  const [CategorySelect, setCategorySelect] = useState<{
    value: string;
    label: string;
  }>({ value: blog.category._id, label: blog.category.cate });
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenCateSelect, setIsOpenCateSelect] = useState(false);

  const setCategory = (data: { value: string; label: string }) => {
    setCategorySelect(() => data);
    setBlogEdit((prev) => ({ ...prev, category: data.value }));
    setIsOpenCateSelect(false);
  };

  const ToggleStatus = () => {
    blogController
      .editBlog({ status: !blog.status }, blog._id)
      .then((message) => {
        setListBlog((prev: any) => ({ ...prev, pageinBlog: 7 }));
        toast.success(message),
          setAcction(`${Math.floor(Math.random() * 100)}`);
      });
  };
  const handleDeleteBlog = () => {
    const result = confirm("Bạn chắc chắc xóa chứ ?");
    result &&
      blogController.deleteBlog(blog._id).then((message) => {
        toast.success(message),
          setListBlog((prev: any) => ({ ...prev, pageinBlog: 7 }));
        setAcction(`${Math.floor(Math.random() * 100)}`);
      });
  };
  return (
    <tr key={blog._id} className="border_line-style  border-b-2 text-xs">
      <td>
        <span className="inline-block py-2 text_style-eclipse max-w-[200px]  px-2">
          {blog.title}
        </span>
      </td>
      <td>
        <span className="capitalize">{blog.category.cate}</span>
      </td>
      <td>
        <span className="capitalize">{blog.author.fullname}</span>
      </td>
      <td>
        <span>{blog.view.toLocaleString()}</span>
      </td>

      <td>
        {blog.status ? (
          <span className="accept">đã kiểm duyệt</span>
        ) : (
          <span className="wating">chờ kiểm duyệt</span>
        )}
      </td>
      <td>
        <span className="px-2">
          {moment(blog.createdAt).format("DD/MM/YYYY")}
        </span>
      </td>
      <td>
        <span>{HandleTimeDiff(blog.updatedAt)}</span>
      </td>
      <td>
        <span className="flex text-xl justify-center text-red-500 md:min-w-[250px]  min-w-[300px] gap-2 news_action py-2 z-50 shadow-2xl">
          {account.permission == "zecky" && (
            <button
              onClick={ToggleStatus}
              className={`p-2 rounded-full ${
                blog.status
                  ? "text-green-500 bg-green-600/20 hover:bg-green-600/50"
                  : "text-red-500 bg-red-600/20 hover:bg-red-600/50 "
              }`}
            >
              {!blog.status ? <BiLock /> : <BiLockOpen />}
            </button>
          )}
          <button
            className="bg-yellow-600/20 hover:bg-yellow-600/50 p-2 rounded-full  text-yellow-500"
            onClick={() => handleOpenNewWindown(blog.slug)}
          >
            <RiEyeLine />
          </button>
          <button
            onClick={() => setIsOpenEdit(true)}
            className="bg-blue-600/20 hover:bg-blue-600/50 p-2 rounded-full  text-blue-500"
          >
            <BiEditAlt />
          </button>
          {account.permission == "zecky" && (
            <button
              onClick={handleDeleteBlog}
              className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
            >
              <BiTrash />
            </button>
          )}
        </span>
      </td>

      {isOpenEdit && (
        <td
          id="blog_page-detail"
          className="fixed inset-0 bg-main block z-10  scroolbar h-screen  text-base !text-left overflow-y-auto"
        >
          <div className="absolute inset-0">
            <section className="container mx-auto   my-12">
              <button
                onClick={() => setIsOpenEdit(false)}
                className="hover:text-hover text-3xl  fixed top-3 right-6 sm:right-24"
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
                  <div className="flex justify-center ">
                    <button
                      onClick={() => setIsOpenCateSelect(!isOpenCateSelect)}
                      className="text-sm bg-green-800 py-1 px-4 hover:bg-green-700 rounded-full"
                    >
                      Chọn lại danh mục
                    </button>
                  </div>
                </>
              )}

              <ViewDescription
                data={blogEdit}
                listImage={[]}
                fullname={account.fullname}
                handleCreateBlog={handleEdit}
                isEdit
              />
            </section>
          </div>
        </td>
      )}
    </tr>
  );
};

export default BlogFiedItem;
