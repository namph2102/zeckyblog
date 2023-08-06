"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BsEye,
  BsChatLeftDots,
  BsBook,
  BsPerson,
  BsGraphDownArrow,
} from "react-icons/bs";
import { getCookie } from "cookies-next";
import LoginDashBoard from "./component/LoginDashBoard";
import { RootState } from "../sevices/store";
import adminController, {
  IIdataPageHome,
} from "../sevices/controller/adminController";

import { HandleTimeDiff, handleOpenNewWindown } from "../sevices/untils";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import LoadingPage from "../component/LoadingPage";

const DashBoard = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const [firstLoadding, setFirstLoading] = useState(true);
  const [dataPage, setDataPage] = useState<IIdataPageHome>({
    listAccount: [],
    listBlog: [],
    listRooms: [],
    totalAccount: 0,
    totalComent: 0,
    listAccountOnline: [],
    totalBlog: 0,
    totalAccountOnline: 0,
  });
  useEffect(() => {
    document.title="Trang quản trị";
    if (!account.fullname) return;

    const accessToken: any = getCookie("accessToken") || "";
    if (!accessToken) {
      setFirstLoading(false);

      return;
    }

    adminController
      .getDataPageHome(accessToken, account._id)
      .then((data) => {
        setDataPage(data);
      })
      .finally(() => {
        setFirstLoading(false);
      });
  }, [account.fullname, account._id]);
  if (account.permission === "member" && firstLoadding == false) {
    return <LoginDashBoard />;
  }

  if (firstLoadding == true && account.fullname)
    return (
      <p className="flex justify-center items-center  mt-40">
        Đang lấy dữ liệu
      </p>
    );
  if (firstLoadding) return <LoadingPage />;
  return (
    <main>
      <section className="my-3 border_line-style  border-b-2">
        <h1>Bảng điều kiển</h1>
      </section>
      <section>
        <div className="grid sm:grid-cols-4 grid-cols-2  gap-2">
          {account.permission != "admin" && (
            <article className="py-2 px-3 bg-primary rounded-3xl">
              <p>Tài khoản</p>
              <p className="flex justify-between">
                <span>{dataPage.totalAccount.toLocaleString()}</span>{" "}
                <BsPerson />
              </p>
            </article>
          )}
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Bài viết</p>
            <p className="flex justify-between">
              <span>{dataPage.totalBlog.toLocaleString()}</span> <BsBook />
            </p>
          </article>
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Bình luận</p>
            <p className="flex justify-between">
              <span>{dataPage.totalComent.toLocaleString()}</span>{" "}
              <BsChatLeftDots />
            </p>
          </article>
          {account.permission != "admin" && (
            <article className="py-2 px-3 bg-primary rounded-3xl">
              <p>
                Đang hoạt động{" "}
                <span className="inline-block bg-green-800 rounded-full w-3 h-3 border-[1px] border-gray-100"></span>
              </p>
              <p className="flex justify-between">
                <span>{dataPage.totalAccountOnline.toLocaleString()}</span>{" "}
                <BsEye />
              </p>
            </article>
          )}
        </div>
      </section>
      <div
        id="dashboard"
        className="grid lg:grid-cols-2 grid-cols-1 lg:gap-2 gap-4 mt-3 "
      >
        {account.permission != "admin" && (
          <>
            <article className="bg-primary rounded-2xl p-2 overflow-x-auto scroolbar">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-8">
                    <BsGraphDownArrow />
                  </span>
                  <span>Quản trị viên</span>
                </div>
                <div className="text-sm bg-main rounded-full py-2 px-4">
                  <Link href="/dashboard/tai-khoan">Xem tất cả</Link>
                </div>
              </div>
              <table className="table-auto text-sm w-full text-center">
                <thead className="border_line-style  border-b-2 text-sm">
                  <tr>
                    <th>
                      <span className="py-2 inline-block">Họ Tên</span>
                    </th>
                    <th>
                      <span className="py-2 inline-block px-4">Liên lạc</span>
                    </th>
                    <th>
                      <span className="py-2 inline-block px-4">Trạng thái</span>
                    </th>
                    <th>
                      <span className="py-2 inline-block px-4">Hoạt động</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPage.listAccount.map((acc) => (
                    <tr key={acc._id}>
                      <td>
                        <span className=" inline-block  text_style-eclipse px-4 sm:max-w-[200px] max-w-[150px] capitalize">
                          {acc.fullname}
                        </span>
                      </td>
                      <td>
                        <span>{acc.phone || acc.email || acc.username}</span>
                      </td>
                      <td>
                        <span>{acc.blocked ? "đã khóa" : "hoạt động"}</span>
                      </td>
                      <td>
                        <span>
                          {acc.status
                            ? "Online"
                            : `Off ${HandleTimeDiff(acc.updatedAt)} `}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="bg-primary rounded-2xl p-2 overflow-x-auto scroolbar">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-8">
                    <BsGraphDownArrow />
                  </span>
                  <span>Đang hoạt động</span>
                </div>
                <div className="text-sm bg-main rounded-full py-2 px-4">
                  <Link href="/dashboard/tai-khoan">Xem tất cả</Link>
                </div>
              </div>
              <table className="table-auto text-sm w-full text-center">
                <thead className="border_line-style  border-b-2 text-sm">
                  <tr>
                    <th>
                      <span className="py-2 inline-block px-4">Họ Tên</span>
                    </th>
                    <th>
                      <span className="py-2 inline-block px-4">Liên lạc</span>
                    </th>
                    <th>
                      <span className="py-2 inline-block px-4">Trạng thái</span>
                    </th>
                    <th>
                      <span className="py-2 inline-block px-4">Hoạt động</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPage.listAccountOnline.map((acc) => (
                    <tr key={nanoid()}>
                      <td>
                        <span className="  inline-block  text_style-eclipse px-4 sm:max-w-[200px] max-w-[150px] capitalize">
                          {acc.fullname}
                        </span>
                      </td>
                      <td>
                        <span>{acc.phone}</span>
                      </td>
                      <td>
                        <span>{acc.blocked ? "Đã khóa" : "Chưa khóa"}</span>
                      </td>
                      <td>
                        <span>
                          {acc.status
                            ? "Online"
                            : `Off ${HandleTimeDiff(acc.updatedAt)} `}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </>
        )}
        <article className="bg-primary rounded-2xl p-2 overflow-x-auto scroolbar">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Bài viết</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/dashboard/tin-tuc">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block  px-4">Tiêu đề</span>
                </th>
                <th>
                  <span className="">Mô tả</span>
                </th>
                <th>
                  <span className="">Lượt xem</span>
                </th>
                <th>
                  <span className="">Xem bài viết</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPage.listBlog.map((blog) => (
                <tr key={nanoid()}>
                  <td>
                    <span className=" inline-block  text_style-eclipse px-4 sm:max-w-[100px] max-w-[150px] capitalize">
                      {blog.title}
                    </span>
                  </td>
                  <td>
                    <span className=" inline-block  text_style-eclipse px-4 sm:max-w-[100px] max-w-[150px] capitalize">
                      {blog.des}
                    </span>
                  </td>
                  <td>
                    <span>{blog.view?.toLocaleString()}</span>
                  </td>
                  <td>
                    <button>
                      <a
                        className="active_href underline py-1 px-3  cursor-pointer"
                        onClick={() => handleOpenNewWindown(blog.slug)}
                      >
                        Tại đây
                      </a>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="bg-primary rounded-2xl p-2 overflow-x-auto scroolbar ">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Nhóm</span>
            </div>
            {account.permission != "admin" && (
              <div className="text-sm bg-main rounded-full py-2 px-4">
                <Link href="/dashboard/nhom-chat">Xem tất cả</Link>
              </div>
            )}
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block px-4 ">Tên nhóm</span>
                </th>

                <th>
                  <span className="py-2 inline-block px-4">Số Thành viên</span>
                </th>
                <th>
                  <span className="py-2 inline-block px-4">Ngày tạo</span>
                </th>
                <th>
                  <span className="py-2 inline-block px-4">Tham gia nhóm</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPage.listRooms.map((room) => (
                <tr key={room._id}>
                  <td>
                    <span className="inline-block py-2 text_style-eclipse max-w-[100px] capitalize">
                      {room.name}
                    </span>
                  </td>
                  <td>
                    <span className="text_style-eclipse inline-block  max-w-[100px]">
                      {room.listUser.length}
                    </span>
                  </td>
                  <td>
                    <span>{moment(room.createdAt).format("DD/MM/YYYY")}</span>
                  </td>
                  <td>
                    <span>
                      <Link
                        href={`https://zecky.online/g/${room._id}`}
                        target="_blank"
                        className="active_href underline"
                      >
                        Tham gia nhóm
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </main>
  );
};

export default DashBoard;
