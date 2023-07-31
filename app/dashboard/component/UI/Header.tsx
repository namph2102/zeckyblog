import { AppDispatch, RootState } from "@/app/sevices/store";
import {
  firstloginWebsite,
  updateFullAccount,
} from "@/app/sevices/store/slice/AccountSlice";
import { getCookie, setCookie } from "cookies-next";

import React, { useEffect, useState } from "react";
import {
  BiLogInCircle,
  BiHomeAlt,
  BiFile,
  BiUser,
  BiBook,
  BiChat,
  BiBookReader,
  BiMenu,
  BiX,
  BiLogOutCircle,
  BiBell,
  BiChurch,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkImageUrl } from "@/app/sevices/untils";
import { toast } from "react-hot-toast";
import { Badge } from "@mui/material";

const HeaderDashboard = () => {
  const router = useRouter();
  const account = useSelector((state: RootState) => state.account.user);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const accessToken: any = getCookie("accessToken") || "";

    if (accessToken) {
      dispatch(firstloginWebsite(accessToken))
        .then((data) => {
          if (!data.payload) {
            router.push("/dashboard/login");
          }
        })
        .catch(() => {
          router.push("/dashboard/login");
        });
    } else {
      router.push("/dashboard/login");
    }
  }, []);
  useEffect(() => {
    if (!account.fullname) return;
    if (account.permission == "member") {
      router.push("/dashboard/login");
    }
  }, [account.permission, account.fullname]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleLogout = () => {
    setCookie("accessToken", "");
    dispatch(
      updateFullAccount({ permission: "member", fullname: "", _id: "" })
    );
    toast.success("Đăng xuất thành công");
    router.push("/dashboard/login");
  };
  return (
    <div className=" my-4 relative z-[99999] bg-main text-white">
      <header className="border_line-style border-b-[2px] z-[99999] lg:block flex justify-between items-center">
        <h2 className="font-bold px-6 my-4">
          <span className="text-2xl">Zecky</span>{" "}
          <sub className="text-xs text-yellow-300">AI</sub>
        </h2>
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="text-3xl hover:text-hover lg:hidden pr-2 text-white"
        >
          {isOpenMenu ? <BiX /> : <BiMenu />}
        </button>
      </header>
      <main
        className={`ease-in duration-300 bg-main w-full lg:static fixed  z-[99999]   ${
          !isOpenMenu ? "translate-y-[-200%] lg:translate-y-0" : "translate-y-0"
        }`}
      >
        <div className="flex justify-between items-center border_line-style  py-1  border-b-2">
          <figure className="flex  items-center gap-2 font-bold px-6 my-4">
            <img
              className="object-cover rounded-lg"
              src={
                checkImageUrl(account.avatar)
                  ? account.avatar
                  : "http://flixtv.volkovdesign.com/admin/img/user.svg"
              }
              width={40}
              height={40}
              alt="logo"
            />

            <figcaption className="text-base">
              <span className="!text-xs first-letter:uppercase ">
                {account.permission == "zecky"
                  ? "Quản trị viên cao cấp"
                  : account.permission}
              </span>
              <p className="font-normal capitalize !text-sm">
                {account.fullname || "Zecky"}
              </p>
            </figcaption>
          </figure>
          <button
            onClick={handleLogout}
            className="text-3xl btn_hover p-1 rounded-sm"
          >
            {account.fullname ? (
              <BiLogInCircle />
            ) : (
              <Link href="/dashboard/login">
                <BiLogOutCircle />
              </Link>
            )}
          </button>
        </div>
        {!account.permission || account.permission !== "member" ? (
          <nav>
            <ul className="font-bold px-6 mt-8">
              <li>
                <Link
                  href="/dashboard"
                  className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600"
                >
                  <span className="text-2xl">
                    <BiHomeAlt />
                  </span>
                  <span className="font-semibold text-base">
                    Bảng điều khiển
                  </span>
                </Link>
              </li>
              {account.permission !== "admin" && (
                <>
                  <li>
                    <Link
                      href="/dashboard/tai-khoan"
                      className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600"
                    >
                      <span className="text-2xl">
                        <BiUser />
                      </span>
                      <span className="font-semibold text-base">Tài khoản</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/danh-muc">
                      <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
                        <span className="text-2xl">
                          <BiBook />
                        </span>
                        <span className="font-semibold text-base">
                          Danh mục
                        </span>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/phong">
                      <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
                        <span className="text-2xl">
                          <BiChurch />
                        </span>
                        <span className="font-semibold text-base">Phòng</span>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/google-drive">
                      <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
                        <span className="text-2xl">
                          <BiChat />
                        </span>
                        <span className="font-semibold text-base">
                          Quản lý Google Drive
                        </span>
                      </p>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/dashboard/thong-bao">
                  <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
                    <span className="text-2xl">
                      <BiBell />
                    </span>
                    <span className="font-semibold text-base">Thông báo</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tin-tuc">
                  <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
                    <span className="text-2xl">
                      <BiFile />
                    </span>
                    <span className="font-semibold text-base">
                      Quản lý bài viết
                    </span>
                  </p>
                </Link>
              </li>

              <li>
                <Link href="/dashboard/craw">
                  <p className="flex gap-2 items-center my-4 cursor-pointer hover:text-blue-600">
                    <span className="text-2xl">
                      <BiBookReader />
                    </span>
                    <span className="font-semibold text-base">
                      Cào nội dung
                    </span>
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <>
            <p className="px-4 text-base">
              Lưu ý: chỉ có quản trị viên mới được vào đây
            </p>
            <div className="mt-2 flex justify-center items-center">
              <button>
                <Link
                  href="/dashboard/login"
                  className="mt-4 py-2 px-4 bg-green-500 hover:bg-green-800 rounded-3xl"
                >
                  Đăng nhập
                </Link>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HeaderDashboard;
