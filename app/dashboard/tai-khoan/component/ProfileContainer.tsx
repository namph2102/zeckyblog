"use client";
import React, { FC, useEffect, useState } from "react";
import { IAccount } from "@/app/sevices/store/slice/AccountSlice";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import "../../styles/blognews.scss";
import Image from "next/image";

import { BiBell, BiCoin, BiTrash } from "react-icons/bi";

import accountController from "@/app/sevices/controller/accountController";
import { toast } from "react-hot-toast";
import { checkImageUrl, componentsProps } from "@/app/sevices/untils";
import { Tooltip } from "@mui/material";
import ListDocument from "./ListDocument";
interface ProfileContainerProps {
  account: IAccount;
  setAccountEdit: (value: string) => void;
}
const ProfileContainer: FC<ProfileContainerProps> = ({
  account,
  setAccountEdit,
}) => {
  const [formik, setFormik] = useState({
    fullname: account.fullname,
    username: account.username,
    email: account.email,
    phone: account.phone,
    blocked: account.blocked,
    permission: account.permission,
    address: account.address,
  });
  const [info, setInfo] = useState({ password: "", repassword: "" });
  const handleChangeFormik = (key: any, value: string) => {
    setFormik((prev: any) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      formik.blocked = Boolean(formik.blocked);
      await accountController.updateAccount(account._id, formik);
      toast.success("Thay đổi thành công");
      setAccountEdit("");
    } catch {
      toast.error("Thay đổi Thất bại");
    }
  };
  const handleSubmitChangePassword = async () => {
    if (info.password == info.repassword) {
      await accountController.updateAccount(account._id, {
        password: info.password,
      });
      toast.success("Thay đổi mật khẩu thành công");
      setAccountEdit("");
    } else {
      toast.error("Mật khẩu không trùng nhau");
    }
  };
  const UpdateAccountData = async (info: any, id: string) => {
    try {
      await accountController.updateAccount(id, info);
      toast.success("Thay đổi thành công");
      setAccountEdit("");
    } catch {
      toast.error("Thay đổi thất bại");
    }
  };
  const deleteAccount = async () => {
    try {
      await accountController.deleteAccount(account._id);
      toast.success("Xóa tài khoảng thành công");
      setAccountEdit("");
    } catch {
      toast.error("Thay đổi thất bại");
    }
  };
  const deleteNoticeAccount = async () => {
    try {
      await accountController.deleteNotice(account._id);
      toast.success("Xóa tất cả thông báo thành công");
    } catch {
      toast.error("Xóa tất cả thông báo thất bại");
    }
  };
  const [showInfo, setShowInfo] = useState(true);
  return (
    <div id="form_select">
      <h2>Tải khoản</h2>

      <div className="flex justify-between bg-main py-3 rounded-xl px-1">
        <div className="flex items-center text-xs gap-2">
          <Image
            className="w-12 h-12"
            width={12}
            height={12}
            src={
              checkImageUrl(account.avatar)
                ? account.avatar
                : "http://flixtv.volkovdesign.com/admin/img/user.svg"
            }
            alt="logo "
          />
          <div>
            <p className="text-base  capitalize">{account.fullname}</p>
            <p className="text-sm capitalize">{account.permission}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowInfo(true)}
            className={` ${showInfo && " text-yellow-600"}`}
          >
            Thông tin
          </button>
          <button
            onClick={() => setShowInfo(false)}
            className={` ${!showInfo && " text-yellow-600"}`}
          >
            Tệp dữ liệu{" "}
          </button>
        </div>
        <div className="mr-4 text-2xl">
          <Tooltip
            title="Xóa tất cả Thông báo"
            arrow
            componentsProps={componentsProps}
            placement="bottom"
          >
            <button
              onClick={deleteNoticeAccount}
              className="bg-green-600/20 hover:bg-green-600/50 p-2 rounded-full  text-green-500"
            >
              <BiBell />
            </button>
          </Tooltip>
          <Tooltip
            title="Xóa AccessToen"
            arrow
            componentsProps={componentsProps}
            placement="bottom"
          >
            <button
              onClick={() =>
                UpdateAccountData({ accessToken: "adminreset" }, account._id)
              }
              className="bg-yellow-600/20 hover:bg-yellow-600/50 p-2 rounded-full mx-2 text-yellow-500"
            >
              <BiCoin />
            </button>
          </Tooltip>
          <Tooltip
            title="Xóa tài khoản"
            arrow
            componentsProps={componentsProps}
            placement="bottom"
          >
            <button
              onClick={deleteAccount}
              className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
            >
              <BiTrash />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 max-h-[80vh] overflow-y-auto scroolbar">
        {showInfo ? (
          <>
            <section>
              <form
                action={handleSubmit}
                className="main__title-form mt-4 grid grid-cols-2 gap-y-4 gap-x-2 py-4 rounded-2xl px-4 bg-[#151f30]"
              >
                <div>
                  <p className="text-sm font-semibold">Tài khoản</p>
                  <input
                    value={formik.username}
                    onChange={(e) =>
                      handleChangeFormik("username", e.target.value)
                    }
                    name="username"
                    placeholder="Nhập tài khoản.."
                    type="text"
                    disabled={true}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Họ tên</p>
                  <input
                    name="fullname"
                    onChange={(e) =>
                      handleChangeFormik("fullname", e.target.value)
                    }
                    value={formik.fullname}
                    type="text"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Quyền</p>
                  <select
                    onChange={(e) =>
                      handleChangeFormik("permission", e.target.value)
                    }
                    value={formik.permission}
                    name="permission"
                    className="select_style"
                  >
                    <option value={account.permission}>
                      {account.permission}
                    </option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="zecky">Zecky</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <input
                    onChange={(e) =>
                      handleChangeFormik("email", e.target.value)
                    }
                    value={formik.email}
                    name="email"
                    type="email"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <input
                    onChange={(e) =>
                      handleChangeFormik("phone", e.target.value)
                    }
                    value={formik.phone}
                    name="phone"
                    type="text"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Khóa</p>
                  <select
                    onChange={(e) =>
                      handleChangeFormik("blocked", e.target.value)
                    }
                    value={`${formik.blocked}`}
                    name="blocked"
                    className="select_style"
                  >
                    <option>
                      {Boolean(formik.blocked) ? "Đang khóa" : "Không bị khóa"}
                    </option>
                    <option value="true">Khóa</option>
                    <option value="false">Không khóa</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold">Địa chỉ</p>
                  <TextareaAutosize
                    onChange={(e) =>
                      handleChangeFormik("address", e.target.value)
                    }
                    value={formik.address}
                    name="address"
                    minRows={2}
                    className="select_style py-3"
                    placeholder="Nhập địa chỉ..."
                  />
                </div>
                <div className="col-span-2 ">
                  <div className="flex justify-center mt-2 ">
                    <button
                      type="submit"
                      className="py-2 px-3 bg-green-800 hover:bg-green-600 rounded-xl text-sm sm:min-w-[200px] min-w-full"
                    >
                      Cập nhập
                    </button>
                  </div>
                </div>
              </form>
            </section>
            <section>
              <form
                action={handleSubmitChangePassword}
                className="main__title-form  mt-4  grid lg:grid-cols-2  grid-cols-1 gap-y-4 gap-x-2 py-2 rounded-2xl px-4 bg-[#151f30]"
              >
                <h2 className="text-center my-2 text-base font-semibold lg:col-span-2 col-span-1">
                  Thay đổi mật khẩu
                </h2>
                <div className="lg:col-span-2 col-span-1">
                  <label
                    htmlFor="idpassword"
                    className="text-sm font-semibold text-left"
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="idpassword"
                    placeholder="Nhập mật khẩu mới..."
                    name="password"
                    type="password"
                    required
                    minLength={5}
                    value={info.password}
                    onChange={(e) =>
                      setInfo((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
                <div className="lg:col-span-2 col-span-1">
                  <label
                    htmlFor="idrepassword"
                    className="text-sm font-semibold  text-left"
                  >
                    Nhập lại Mật khẩu
                  </label>
                  <input
                    placeholder="Nhập lại mật khẩu..."
                    id="idrepassword"
                    name="repassword"
                    type="password"
                    value={info.repassword}
                    onChange={(e) =>
                      setInfo((prev) => ({
                        ...prev,
                        repassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-center items-center lg:col-span-2 col-span-1">
                  <button
                    type="submit"
                    className="bg-green-900 hover:bg-green-700 text-sm rounded-full py-2 px-5"
                  >
                    Thay đổi mật khẩu
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <section className="lg:col-span-2 col-span-1">
            <ListDocument idAccount={account._id} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfileContainer;
