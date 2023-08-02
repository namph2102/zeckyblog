import Image from "next/image";
import React from "react";
import { RiMenuFill, RiArrowDownSLine } from "react-icons/ri";
import LogoIcon from "../assets/logo.png";
import Link from "next/link";
import { ICateCreate } from "../sevices/controller/cateController";
interface HeaderProps {
  listMenu: ICateCreate[];
}
const Header: React.FC<HeaderProps> = ({ listMenu }) => {
  return (
    <header className="flex sm:justify-start z-[99] justify-between gap-2 mb-4 bg-main items-baseline py-4 sticky top-0  left-0 right-0 ease-in duration-300">
      <div className="mr-6">
        <Link className="flex items-baseline" href="/">
          <>
            <Image
              src={LogoIcon}
              alt="Logo zecky"
              width={40}
              height={40}
              className="object-cover"
            />
            <sub className="text-white text-base font-medium">ecky</sub>
          </>
        </Link>
      </div>

      <p className="sm:hidden menu_navbar text-3xl hover:text-yellow-500 cursor-pointer">
        <label className="cursor-pointer" htmlFor="openmenu">
          <RiMenuFill />
        </label>
      </p>
      <input id="openmenu" type="checkbox" className="hidden" />
      <nav className="menu_moblie relative sm:block hidden">
        <ul className="sm:flex hidden gap-x-6 gap-y-2  menu_main__container">
          <li className="text-sm   py-2 font-semibold ">
            <span>
              <Link href="/"> Trang chủ</Link>
            </span>
          </li>
          <li className="text-sm cursor-pointer relative py-2 menu-drop_parent font-semibold ">
            <p className="flex gap-1 items-center">
              <span> Danh mục</span> <RiArrowDownSLine />
            </p>
            <ul className="absolute hidden overflow-y-auto scroolbar max-h-[80vh] top-full left-0 lg:w-[500px] bg-primary  w-[300px]  gap-2 flex-wrap menuDrop">
              {listMenu &&
                listMenu.map((cate) => (
                  <li key={cate.slug}>
                    <Link
                      className="capitalize text-sm py-1 inline-block"
                      href={`/danh-muc/${cate.slug}`}
                    >
                      {cate.cate}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>

          <li className="text-sm   py-2 font-semibold ">
            <span>
              <Link href="/tin-tuc"> Tin tức</Link>
            </span>
          </li>
          <li className="text-sm  py-2 font-semibold ">
            <span>
              <Link href="/hoc-lap-trinh"> Học lập trình</Link>
            </span>
          </li>
          <label
            htmlFor="openmenu"
            className="fixed top-2 right-4 sm:hidden cursor-pointer font-bold text-white hover:text-red-500"
          >
            X
          </label>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
