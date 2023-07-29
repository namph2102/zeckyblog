"use client";
import blogController from "@/app/sevices/controller/blogController";
import { Pagination } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { RiEyeLine } from "react-icons/ri";
import BlogFiedItem from "./BlogFiedItem";
import "../styles/blognews.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/sevices/store";
import LoadingPage from "@/app/component/LoadingPage";

import { IDataBlog } from "@/app/sevices/typedata";
import CreateBlog from "./CreateBlog";
import SelectSimpleItem, { ISelect } from "../component/form/SelectSimpleItem";
import adminController from "@/app/sevices/controller/adminController";
import { IAccount } from "@/app/sevices/store/slice/AccountSlice";
import { capitalizeText } from "@/app/sevices/untils";
import SearchContainer from "../component/form/SearchContainer";
const getDataShow = (
  skip: number,
  limit: number,
  userId?: string,
  authorID?: string
) => {
  return blogController.getDashboardPage(skip, limit, userId, authorID);
};

const BlogDashboard = () => {
  const pageinBlog = 7;
  const account = useSelector((state: RootState) => state.account.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [acction, setAcction] = useState("");
  const [isLoadding, setIsLoadding] = useState(true);
  const [listCate, setListCate] = useState<ISelect[]>([]);
  const [idUseSelect, setIdUserSelect] = useState("");
  const [listBlogs, setListBlog] = useState<{
    total: number;
    listBlog: IDataBlog[];
    totalView: number;
    pageinBlog: number;
  }>({ listBlog: [], total: 0, totalView: 0, pageinBlog });

  useEffect(() => {
    if (!account._id) return;

    getDataShow(
      (currentPage - 1) * listBlogs.pageinBlog,
      listBlogs.pageinBlog,
      account._id,
      idUseSelect
    )
      .then((data) => {
        setListBlog((prev) => ({ ...prev, ...data }));
      })
      .finally(() => {
        setIsLoadding(false);
      });
  }, [account._id, currentPage, account.fullname, acction, idUseSelect]);

  const listBlog = listBlogs.listBlog || [];
  const totalBlog = listBlogs.total || 0;
  const totalPage = Math.ceil(totalBlog / listBlogs.pageinBlog);
  const handleChangePage = (event: any, page: number) => {
    setCurrentPage(page);
  };
  //get listaccount
  useEffect(() => {
    if (account.permission == "zecky") {
      adminController.getListAccountAdmin().then((data: any) => {
        const listAccount: Pick<IAccount, "_id" | "fullname">[] =
          data.listAccount;
        if (listAccount) {
          const listCateCover: ISelect[] = listAccount.map((user) => ({
            value: user._id,
            label: capitalizeText(user.fullname),
          }));
          setListCate(listCateCover);
        }
      });
    }
  }, [account.permission]);

  const handleChagneSelect = useCallback(
    (data: any) => {
      setIdUserSelect(data.value);
      setCurrentPage(1);
    },
    [account._id]
  );
  const handleSearBlog = useCallback(
    (search: string) => {
      if (search) {
        blogController.adminSearchBlog(search, account._id).then((listBlog) => {
          setListBlog((prev: any) => ({
            ...prev,
            listBlog,
            pageinBlog: 1000,
          }));
        });
      } else {
        blogController
          .getDashboardPage(0, pageinBlog, account._id)
          .then((data) => {
            setListBlog((prev: any) => ({ ...prev, ...data, pageinBlog }));
          });
      }
    },
    [account._id]
  );
  return (
    <div className="my-2">
      <section className="my-3 border_line-style  border-b-2 flex lg:flex-row flex-col justify-between items-center">
        <div>
          <h2 className="sm:text-2xl text-base">Quản lý tin tức</h2>
          {listBlogs.totalView > 0 && account.permission == "zecky" && (
            <p className="flex items-center gap-2">
              <RiEyeLine />
              {listBlogs.totalView.toLocaleString()}
            </p>
          )}
        </div>
        {account.permission == "zecky" && (
          <SelectSimpleItem
            listCate={[
              { value: "true", label: "Đã kiểm duyệt" },
              { value: "false", label: "Chưa kiểm duyệt" },
              ...listCate,
            ]}
            handleChange={handleChagneSelect}
            title="Quản trị viên"
          />
        )}
        <SearchContainer
          handleSearch={handleSearBlog}
          title="Tìm kiếm bài viết"
          idAccount={account._id}
        />
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
                  <span className="py-2 px-4">Người tạo</span>
                </th>
                <th>
                  <span className="py-2 px-4">Lượt xem</span>
                </th>

                <th>
                  <span className="py-2 px-4">Trạng thái</span>
                </th>
                <th>
                  <span className="py-2 px-4">Ngày tạo</span>
                </th>
                <th>
                  <span className="py-2 px-4">Cập nhập</span>
                </th>
                <th colSpan={4}>
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

export default BlogDashboard;
