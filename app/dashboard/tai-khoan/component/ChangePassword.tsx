import React from "react";

const ChangePassword = () => {
  return (
    <div>
      <form className="main__title-form  mt-4  grid lg:grid-cols-2  grid-cols-1 gap-y-4 gap-x-2 py-2 rounded-2xl px-4 bg-[#151f30]">
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
          />
        </div>
        <div className="flex justify-center items-center lg:col-span-2 col-span-1">
          <button
            type="button"
            className="bg-green-900 hover:bg-green-700 text-sm rounded-full py-2 px-5"
          >
            Thay đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
