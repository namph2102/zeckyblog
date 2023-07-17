import React from "react";

const Footer = () => {
  return (
    <footer>
      <p className="text-center py-4 border-b-4 border-[#666666]">
        <a
          href="https://www.facebook.com/namhoai2102"
          target="_blank"
          className="text-3xl text-center font-bold hover:opacity-100 hover:text-white"
        >
          f
        </a>
      </p>
      <p className="text-center my-8">
        © 2023 zecky.online | Tạo bởi{" "}
        <a
          className="text-white opacity-70 font-bold hover:opacity-100"
          href="https://www.facebook.com/namhoai2102"
        >
          Hoài Nam
        </a>
      </p>
    </footer>
  );
};

export default Footer;
