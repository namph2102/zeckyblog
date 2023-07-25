"use client";
import blogController from "@/app/sevices/controller/blogController";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { RiEyeLine } from "react-icons/ri";
import BlogFiedItem from "./BlogFiedItem";
import "./blognews.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/sevices/store";
import LoadingPage from "@/app/component/LoadingPage";
import SearchContainer from "./SearchContainer";
import { IDataBlog } from "@/app/sevices/typedata";
import CreateBlog from "./CreateBlog";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const account = useSelector((state: RootState) => state.account.user);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [acction, setAcction] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoadding, setIsLoadding] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [listBlogs, setListBlog] = useState<{
    total: number;
    listBlog: IDataBlog[];
    totalView: number;
    pageinBlog: number;
  }>({ listBlog: [], total: 0, totalView: 0, pageinBlog: 7 });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!account._id) return;
    blogController
      .getDashboardPage(
        (currentPage - 1) * listBlogs.pageinBlog,
        listBlogs.pageinBlog,
        account._id
      )
      .then((data) => {
        setListBlog((prev) => ({ ...prev, ...data }));
      })
      .finally(() => {
        setIsLoadding(false);
      });
  }, [account._id, currentPage, account.fullname, acction]);
  const listBlog = listBlogs.listBlog || [];
  const totalBlog = listBlogs.total || 0;
  const totalPage = Math.ceil(totalBlog / listBlogs.pageinBlog);
  const handleChangePage = (event: any, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-2">
      <section className="my-3 border_line-style  border-b-2 flex justify-between items-center">
        <div>
          <h1>Quản lý tin tức</h1>
          {listBlogs.totalView > 0 && account.permission == "zecky" && (
            <p className="flex items-center gap-2">
              <RiEyeLine />
              {listBlogs.totalView.toLocaleString()}
            </p>
          )}
        </div>
        <SearchContainer setListBlog={setListBlog} idAccount={account._id} />
      </section>
      <section className="min-h-[80vh] lg:w-full w-[100vw] overflow-x-auto scroolbar">
        {isLoadding && <LoadingPage />}
        {account.permission !== "member" && !isLoadding && (
          <CreateBlog setAcction={setAcction} account={account} />
        )}
        {!isLoadding && (
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block px-4">Tiêu đề</span>
                </th>
                <th>
                  <span className="py-2 inline-block px-4">Danh mục</span>
                </th>
                <th>
                  <span className="py-2 px-4">Người tạo</span>{" "}
                </th>
                <th>
                  <span className="py-2 px-4">Lượt xem</span>{" "}
                </th>
                <th>
                  <span className="py-2 px-4">Xem bài viết</span>{" "}
                </th>
                <th>
                  <span className="py-2 px-4">Trạng thái</span>{" "}
                </th>
                <th>
                  <span className="py-2 px-4">Cập nhập</span>{" "}
                </th>
                <th colSpan={3}>
                  <span className="py-2 px-4">Hành động</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {listBlog?.length > 0 ? (
                listBlog.map((blog) => (
                  <BlogFiedItem
                    setListBlog={setListBlog}
                    setAcction={setAcction}
                    account={account}
                    blog={blog}
                    key={blog._id}
                  />
                ))
              ) : (
                <tr className="text-center mt-2 text-yellow-400 text-sm font-semibold">
                  <td colSpan={8}>
                    <span className="text-center mt-2 text-yellow-400 text-sm font-semibold inline-block">
                      Bạn chưa có bài viết nào{" "}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        {totalPage > 1 && (
          <section className="text-white panation flex justify-center mt-4">
            <Pagination
              onChange={handleChangePage}
              color="secondary"
              count={totalPage}
              page={currentPage}
              defaultPage={1}
              boundaryCount={totalPage > 10 ? 2 : 1}
            />
          </section>
        )}
      </section>
    </div>
  );
};

export default page;
