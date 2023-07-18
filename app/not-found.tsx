import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImageNotFound from "./assets/pagenotfound.png";
const PageNotFound = () => {
  return (
    <div className="bg-main">
      <head>
        <title>Trang không tồn tại | Zecky</title>
        <meta
          name="description"
          content="Trang không tồn tại, Vui lòng chọn trang khác"
        />
      </head>

      <section
        style={{
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
        className="relative w-screen h-screen overflow-hidden"
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "1.875rem",
            fontWeight: "bold",
            position: "absolute",
            top: "24px",
            left: "0px",
            right: "0px",
            color: "yellow",
          }}
          className="absolute top-8 text-yellow-600 font-bold left-0 text-center text-3xl right-0 !bg-none"
        >
          Trang không tồn tại!
        </p>
        <Image
          width={400}
          src={ImageNotFound}
          height={400}
          style={{
            width: "100%",
            height: "100vh",
          }}
          className="w-screen h-screen "
          alt="Page not Found"
        />
        <div
          style={{
            display: "flex",
            left: "0px",
            right: "0px",
            bottom: "80px",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="flex items-center justify-center left-0 bottom-20  right-0 absolute "
        >
          <Link
            href="/"
            style={{
              backgroundColor: "green",
              textDecoration: "none",
              fontSize: "20px",
              color: "white ",
              borderRadius: "4px",
              padding: "8px 16px",
            }}
            className="py-2 px-5 bg-green-700 hover:bg-green-900 rounded-2xl cursor-pointer "
          >
            Trang chủ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
