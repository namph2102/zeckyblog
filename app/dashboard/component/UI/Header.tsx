import Image from "next/image";
import React from "react";
import {
  BiLogInCircle,
  BiHomeAlt,
  BiFile,
  BiUser,
  BiBook,
  BiChat,
} from "react-icons/bi";
const HeaderDashboard = () => {
  return (
    <div className=" my-4">
      <header className="border_line-style border-b-[2px]">
        <h2 className="font-bold px-6 my-4">
          <span className="text-2xl">Zecky</span>{" "}
          <sub className="text-xs text-yellow-300">AI</sub>
        </h2>
      </header>
      <div className="flex justify-between items-center border_line-style  py-1  border-b-2">
        <figure className="flex  items-center gap-2 font-bold px-6 my-4">
          <Image
            className="object-cover rounded-lg"
            src="http://flixtv.volkovdesign.com/admin/img/user.svg"
            width={40}
            height={40}
            alt="logo"
          />
          <figcaption className="text-base ">
            <span className="text-xs">Admin</span>
            <p className="font-semibold">Hoài Nam</p>
          </figcaption>
        </figure>
        <button className="text-3xl btn_hover p-1 rounded-sm">
          <BiLogInCircle />
        </button>
      </div>
      <nav>
        <ul className="font-bold px-6 mt-8">
          <li>
            <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
              <span className="text-2xl">
                <BiHomeAlt />
              </span>
              <span className="font-semibold text-base">Bảng điều khiển</span>
            </p>
          </li>
          <li>
            <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
              <span className="text-2xl">
                <BiUser />
              </span>
              <span className="font-semibold text-base">Tài khoản</span>
            </p>
          </li>
          <li>
            <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
              <span className="text-2xl">
                <BiChat />
              </span>
              <span className="font-semibold text-base">Nhóm chat</span>
            </p>
          </li>
          <li>
            <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
              <span className="text-2xl">
                <BiFile />
              </span>
              <span className="font-semibold text-base">Tài liệu</span>
            </p>
          </li>

          <li>
            <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
              <span className="text-2xl">
                <BiBook />
              </span>
              <span className="font-semibold text-base">Bài Viết</span>
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderDashboard;
