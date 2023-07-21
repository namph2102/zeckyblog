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
  IRoom,
  Icomment,
} from "../sevices/controller/adminController";
import { IAccount } from "../sevices/store/slice/AccountSlice";
import { IDataBlog } from "../sevices/typedata";
import { HandleTimeDiff, handleOpenNewWindown } from "../sevices/untils";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import { Backdrop } from "@mui/material";

const DashBoard = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const [dataPage, setDataPage] = useState<{
    listAccount: IAccount[];
    listBlog: IDataBlog[];
    listComment: Icomment[];
    listRooms: IRoom[];
  }>({
    listAccount: [],
    listBlog: [],
    listComment: [],
    listRooms: [],
  });
  useEffect(() => {
    if (!account.fullname) return;
    const accessToken: any = getCookie("accessToken") || "";
    if (!accessToken) return;

    adminController.getDataPageHome(accessToken).then((data) => {
      setDataPage(data);
    });
  }, [account.fullname]);
  if (account.permission === "member") {
    return <LoginDashBoard />;
  }
  const totalOnline = dataPage.listAccount.filter((a) => a.status).length;
  if (dataPage.listAccount.length <= 0 || !account.fullname)
    return (
      <p className="flex justify-center items-center  mt-40">
        Đang lấy dữ liệu
      </p>
    );
  return (
    <main>
      <section className="my-3 border_line-style  border-b-2">
        <h1>Bảng điều kiển</h1>
      </section>
      <section>
        <div className="grid sm:grid-cols-4 grid-cols-2  gap-2">
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Tài khoản</p>
            <p className="flex justify-between">
              <span>{dataPage.listAccount.length.toLocaleString()}</span>{" "}
              <BsPerson />
            </p>
          </article>
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Bài viết</p>
            <p className="flex justify-between">
              <span>{dataPage.listBlog.length.toLocaleString()}</span>{" "}
              <BsBook />
            </p>
          </article>
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Bình luận</p>
            <p className="flex justify-between">
              <span>{dataPage.listComment.length.toLocaleString()}</span>{" "}
              <BsChatLeftDots />
            </p>
          </article>
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>
              Đang hoạt động{" "}
              <span className="inline-block bg-green-800 rounded-full w-3 h-3 border-[1px] border-gray-100"></span>
            </p>
            <p className="flex justify-between">
              <span>{totalOnline}</span> <BsEye />
            </p>
          </article>
        </div>
      </section>
      <div className="grid sm:grid-cols-2 grid-cols-1  gap-2 mt-3">
        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Quản trị viên</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Họ Tên</span>
                </th>
                <th>Liên lạc</th>
                <th>Trạng thái</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {dataPage.listAccount
                .filter((a) => a.permission !== "member")
                .slice(0, 5)
                .map((acc) => (
                  <tr
                    key={acc._id}
                    className="border_line-style  border-b-2 text-xs"
                  >
                    <td>
                      <span className="inline-block py-2 capitalize">
                        {acc.fullname}
                      </span>
                    </td>
                    <td>
                      <span>{acc.phone || acc.email || acc.username}</span>
                    </td>
                    <td>
                      <span>{acc.blocked ? "Đã khóa" : "Chưa khóa"}</span>
                    </td>
                    <td>
                      <span>
                        {acc.status
                          ? "Online"
                          : `hoạt động ${HandleTimeDiff(
                              acc.createdAt,
                              acc.updatedAt
                            )} `}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </article>
        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Đang hoạt động</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Họ Tên</span>
                </th>
                <th>Số Điện thoại</th>
                <th>Trạng thái</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {dataPage.listAccount
                .filter((a) => a.permission !== "member")
                .slice(0, 5)
                .map((acc) => (
                  <tr
                    key={nanoid()}
                    className="border_line-style  border-b-2 text-xs"
                  >
                    <td>
                      <span className="inline-block py-2 capitalize">
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
                          : `hoạt động ${HandleTimeDiff(
                              acc.createdAt,
                              acc.updatedAt
                            )} `}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </article>

        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Bài viết</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Tiêu đề</span>
                </th>
                <th>Mô tả</th>
                <th>Lượt xem</th>
                <th>Xem bài viết</th>
              </tr>
            </thead>
            <tbody>
              {dataPage.listBlog.slice(0, 5).map((blog) => (
                <tr
                  key={nanoid()}
                  className="border_line-style  border-b-2 text-xs"
                >
                  <td>
                    <span className="inline-block py-2 text_style-eclipse max-w-[100px] capitalize">
                      {blog.title}
                    </span>
                  </td>
                  <td>
                    <span className="text_style-eclipse inline-block  max-w-[100px]">
                      {blog.des}
                    </span>
                  </td>
                  <td>
                    <span>{blog.view.toLocaleString()}</span>
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

        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Nhóm</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Tên nhóm</span>
                </th>

                <th>Số Thành viên</th>
                <th>Ngày tạo</th>
                <th>Tham gia nhóm</th>
              </tr>
            </thead>
            <tbody>
              {dataPage.listRooms.slice(0, 5).map((room) => (
                <tr
                  key={room._id}
                  className="border_line-style  border-b-2 text-xs"
                >
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
