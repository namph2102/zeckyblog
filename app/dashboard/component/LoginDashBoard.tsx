import { AppDispatch } from "@/app/sevices/store";
import { LoginAccount } from "@/app/sevices/store/slice/AccountSlice";

import React from "react";
import Image from "next/image";
import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ImageLogo from "../../assets/logo.png";
import Link from "next/link";
import { customeAxios } from "@/app/sevices/untils";
const LoginDashBoard = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const loginAccount = async (formdata: FormData) => {
    const username: any = formdata.get("username") || "";
    const password: any = formdata.get("password") || "";
    if (!username || !password) {
      toast.error("Vui lòng đăng nhập đầy đủ!");
      return;
    } else {
      const payload: any = { username, password };
      dispatch(LoginAccount(payload)).then(({ accessToken }) => {
        setCookie("accessToken", accessToken);
        customeAxios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        router.push("/dashboard");
      });
    }
  };
  return (
    <section className="bg-main">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          className="flex items-baseline mb-6 text-2xl font-semibold"
          href="/"
        >
          <Image
            src={ImageLogo}
            alt="Logo zecky"
            width={40}
            height={40}
            className="object-cover"
          />
          <span className="text-white text-base font-medium">ecky</span>
        </Link>

        <div className="w-full bg-primary  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
              Đăng nhập
            </h1>
            <form className="space-y-4 md:space-y-6" action={loginAccount}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium  "
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Nhập tài khoản..."
                  className="bg-gray-50 border border-gray-300 text-black  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  "
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-main hover:bg-gray-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng nhập
              </button>
              <p className="text-sm font-light">
                <span className="opacity-70 pr-2">Bạn chưa có tài khoản? </span>
                <a
                  href="https://zecky.online/dang-ky"
                  target="_blank"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Đăng ký tại zecky
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginDashBoard;
