import Image from "next/image";
import React from "react";

import LogoIcon from "../assets/logo.png";
import Link from "next/link";
import "./Header.scss"
import { ICateData } from "../sevices/controller/cateController";

interface HeaderProps {
  listMenu: ICateData[];
}
const Header: React.FC<HeaderProps> = ({ listMenu }) => {
  
  return (
    
    <header className="sticky top-0 left-0 right-0 ease-in duration-300 bg-main mb-4 z-[4]">
   <nav className="bg-main">
  <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl md:p-4 p-2">
    <Link href="/" className="flex items-center">
    <Image
              src={LogoIcon}
              alt="Logo zecky"
              width={40}
              height={40}
              className="object-cover"/>
   <sub className="text-white text-base font-medium">ecky</sub>
    </Link>
    <label htmlFor="mega-menu-full" data-collapse-toggle="mega-menu-full" className="md:hidden cursor-pointer" aria-controls="mega-menu-full" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </label>
    <input type="checkbox" id="mega-menu-full"  hidden />
    <div id="mega-menu-full" className="items-center justify-between md:static absolute left-0 right-0 top-12 font-medium hidden w-full md:flex md:w-auto md:order-1">
      <ul className="flex flex-col p-4 md:p-0 mt-4  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:bg-transparent bg-primary ">
        <li>
          <Link href="/" className="block cursor-pointer" aria-current="page">Trang chủ</Link>
        </li>
        <li>
          <label htmlFor="idcheckbox" data-collapse-toggle="mega-menu-full-dropdown" className="flex items-center justify-between w-full  text-white hover:text-hover cursor-pointer">Danh mục <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
            </svg></label>
        </li>
        <li>
          <Link href="/tin-tuc" className="cursor-pointer">Tin tức</Link>
        </li>
        <li>
          <Link href="/hoc-lap-trinh" className="cursor-pointer">Học lập trình</Link>
        </li>
      
      </ul>
    </div>
  </div>
  <input type="checkbox" id="idcheckbox"  hidden />
  <div id="mega-menu-full-dropdown" className=" mt-1 border-gray-200 shadow-sm bg-primary absolute md:top-full top-0 left-0 right-0">
     <button className="text-3xl absolute right-3 top-2"><label className="cursor-pointer" htmlFor="idcheckbox">X</label></button>
    
    <ul className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 scroolbar  overflow-y-auto md:max-h-[82vh] max-h-screen sm:grid-cols-2 md:px-6">
          {listMenu.map((menu)=>  <li key={menu.slug}><Link  href={`/danh-muc/${menu.slug}`} className="block p-3 rounded-lg ">
            <div className="font-semibold capitalize">{menu.cate}</div>
            <span className="text-sm text-white opacity-50 line-clamp-2">{menu.des ||`Tổng hợp tin tức nổi bật về ${menu.cate} uy tính`}</span>
          </Link></li>)}
    </ul>
  </div>
</nav>

    </header>
  );
};

export default Header;
