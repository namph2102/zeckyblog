"use client";
import accountController from "@/app/sevices/controller/accountController";
import adminController from "@/app/sevices/controller/adminController";
import { RootState } from "@/app/sevices/store";
import { Pagination } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
interface INotice {
  _id: string;
  userSend: { fullname: string; avatar: string; _id: string };
  message: string;
  createdAt: string;
}
const NoticeDashboard = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const [listNotice, setListNotice] = useState<INotice[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const pageinPage = 8;
  useEffect(() => {
    if (account._id) {
      adminController
        .getListNotice(account._id, pageinPage, (currentPage - 1) * pageinPage)
        .then((data) => {
          setListNotice(data.listNotice), setTotal(data.totalNotice);
        });
    }
  }, [account._id, currentPage]);

  const totalPage = Math.ceil(total / pageinPage);
  const handleChangePage = (e: any, page: number) => {
    setCurrentPage(page);
  };
  const handleDeleteNotice = (id: string) => {
    id &&
      adminController.handleDeleteInfo(id).then((data) => {
        toast.success(data);
        if (listNotice.length == 1) {
          if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
          } else {
            setCurrentPage((prev) => prev + 1);
          }
        } else {
          setListNotice((prev) => prev.filter((item) => item._id != id));
        }
      });
  };
  const handleDeleteAll = async () => {
    if (
      confirm(
        account.permission == "admin"
          ? "Xác nhận xóa tất cả thông báo của bạn?"
          : "Xóa Toàn bộ thông báo của mọi người?"
      )
    ) {
      if (account.permission == "admin") {
        await accountController.deleteAccount(account._id);
      } else {
        await accountController.deleteAllNotice();
      }
      setListNotice(() => []);
      setTotal(0);
      setCurrentPage(1);
    }
  };
  if (!account._id)
    return (
      <p className="text-center mt-6 text-red-500 text-2xl">
        Không có quyền vào
      </p>
    );
  return (
    <div>
      <section className="my-3 border_line-style  border-b-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1>Thông báo </h1>
          <p className="font-bold text-base text-yellow-600">{total}</p>
          <button
            onClick={handleDeleteAll}
            className="py-2 px-5 bg-green-800 hover:bg-green-900  text-sm rounded-full"
          >
            Xóa tất cả thông báo
          </button>
        </div>
      </section>
      <section className="min-h-[80vh] lg:w-full w-[100vw] overflow-x-auto scroolbar ">
        <table className="table-auto text-sm w-full text-center">
          <thead className="border_line-style  border-b-2 text-sm">
            <tr>
              <th>
                <span className="py-2 inline-block px-4">#ID</span>
              </th>
              <th>
                <span className="py-2 px-4">Người gửi</span>
              </th>

              <th>
                <span className="py-2 px-4">Lời nhắn</span>
              </th>
              <th>
                <span className="py-2 px-4">Ngày gửi</span>
              </th>
              <th>
                <span className="py-2 px-4">Hành động </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listNotice.map((notice, index) => (
              <tr
                key={notice._id}
                className="border_line-style  border-b-2 text-xs"
              >
                <td>
                  <span className="inline-block py-2 capitalize px-2">
                    {index + 1}
                  </span>
                </td>
                <td>
                  {account._id != notice.userSend._id ? (
                    <>
                      <span className="flex gap-2 items-center justify-center min-w-[120px] py-2 i px-4">
                        <Image
                          width={40}
                          height={40}
                          alt={notice.userSend.fullname}
                          src={notice.userSend.avatar}
                          className="2-10 h-10 object-cover rounded-xl"
                        />
                        {notice.userSend.fullname}
                      </span>
                    </>
                  ) : (
                    <span>Bạn</span>
                  )}
                </td>

                <td>
                  <span className="py-2 inline-block px-4 capitalize min-w-[400px] whitespace-nowrap">
                    {notice.message}
                  </span>
                </td>
                <td>
                  <span>
                    {moment(notice.createdAt).format("HH:mm:ss-DD/MM/YYYY")}
                  </span>
                </td>
                <td>
                  <span className="flex text-xl justify-center text-red-500 gap-2 news_action py-2 z-50 shadow-2xl">
                    <button
                      onClick={() => handleDeleteNotice(notice._id)}
                      className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
                    >
                      <BiTrash />
                    </button>
                  </span>
                </td>
              </tr>
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
    </div>
  );
};

export default NoticeDashboard;
