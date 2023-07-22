"use client";
import blogController from "@/app/sevices/controller/blogController";
import { Debounced } from "@/app/sevices/untils";
import React, { useRef } from "react";
import { BiSearch } from "react-icons/bi";
interface SearchContainerPros {
  setListBlog: (prev: any) => any;
  idAccount: string;
}
const SearchContainer: React.FC<SearchContainerPros> = ({
  setListBlog,
  idAccount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const getListUserSearch = () => {
    const search = inputRef.current?.value;
    if (search) {
      blogController.adminSearchBlog(search, idAccount).then((listBlog) => {
        setListBlog((prev: any) => ({ ...prev, listBlog, pageinBlog: 1000 }));
      });
    } else {
      const pageinBlog = 7;
      blogController.getDashboardPage(0, pageinBlog, idAccount).then((data) => {
        setListBlog((prev: any) => ({ ...prev, ...data, pageinBlog }));
      });
    }

    console.log(inputRef.current?.value);
  };

  return (
    <div>
      <div className="main__title-form mr-2 flex items-center bg-[#151f30] rounded-full pr-2">
        <input
          ref={inputRef}
          onInput={Debounced(getListUserSearch, 1000)}
          type="search "
          placeholder="Tìm kiếm bài viết..."
        />
        <BiSearch />
      </div>
    </div>
  );
};

export default SearchContainer;
