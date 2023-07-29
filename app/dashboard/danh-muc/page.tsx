"use client";
import React, { useEffect, useState } from "react";
import "../styles/blognews.scss";
import { Pagination, Tooltip } from "@mui/material";
import { BiEditAlt } from "react-icons/bi";
import { componentsProps } from "@/app/sevices/untils";
import { IAccount } from "@/app/sevices/store/slice/AccountSlice";
import CategoryItem from "./CategoryItem";
import adminController from "@/app/sevices/controller/adminController";
import { useSelector } from "react-redux";
import { RootState } from "@/app/sevices/store";
import "../styles/blognews.scss";
export interface ICate {
  _id: string;
  slug: string;
  cate: string;
  author: IAccount;
  des: string;
  createdAt: string;
  pathImage: string;
  image: string;
  count: number;
}
import FormEditCate from "./FormEditCate";
const CategoryDashboard = () => {
  const pageinLog = 5;
  const [listCate, setListCate] = useState<ICate[]>([]);
  const account = useSelector((state: RootState) => state.account.user);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cateEdit, setCateEdit] = useState<any>({});

  useEffect(() => {
    if (!account._id) return;
    adminController.getListCate().then((data) => {
      const listCateObj: Record<string, number> = {};
      data.listCateCount.forEach((item: any) => {
        listCateObj[item._id] = item.count;
      });
      const listcate: any = data.listcate.map((item: any) => {
        if (listCateObj[item._id]) {
          item.count = listCateObj[item._id];
        } else {
          item.count = 0;
        }
        return item;
      });
      setListCate(listcate);
      setTotalPage(Math.ceil(listcate.length / pageinLog));
    });
  }, [account._id]);
  const handleChangePage = (e: any, page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <section className="my-3 border_line-style flex gap-2  border-b-2  lg:flex-row flex-col justify-start items-center">
        <h1>Danh mục</h1> <sub>{listCate.length}</sub>
      </section>
      <section className="min-h-[80vh] lg:w-full w-[100vw] overflow-x-auto scroolbar ">
        <table className="table-auto text-sm w-full text-center">
          <thead className="border_line-style  border-b-2 text-sm">
            <tr>
              <th>
                <span className="py-2 px-4">Tên danh mục</span>
              </th>
              <th>
                <span className="py-2 px-4">Slug</span>
              </th>
              <th>
                <span className="py-2 px-4">Mô tả</span>
              </th>
              <th>
                <span className="py-2 px-4">Ảnh Seo</span>
              </th>
              <th>
                <span className="py-2 px-4">Người tạo</span>
              </th>
              <th>
                <span className="py-2 px-4">Ngày tạo</span>
              </th>
              <th>
                <span className="py-2 px-4">Số lượng</span>
              </th>
              <th colSpan={4}>
                <span className="py-2 px-4">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listCate
              .slice((currentPage - 1) * pageinLog, currentPage * pageinLog)
              .map((item) => (
                <CategoryItem
                  setCateEdit={setCateEdit}
                  setListCate={setListCate}
                  cate={item}
                  key={item._id}
                />
              ))}
          </tbody>
        </table>
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
      {cateEdit?._id && (
        <div className="fixed inset-0  z-50 bg-black/60 flex  overflow-y-auto">
          <FormEditCate
            setListCate={setListCate}
            setCateEdit={setCateEdit}
            category={cateEdit}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryDashboard;
