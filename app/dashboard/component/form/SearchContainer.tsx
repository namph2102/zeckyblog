"use client";
import { Debounced } from "@/app/sevices/untils";
import React, { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import "../../styles/blognews.scss";
interface SearchContainerProps {
  handleSearch: (search: string) => void;
  idAccount: string;
  title: string;
}
const SearchContainer: React.FC<SearchContainerProps> = ({
  idAccount,
  title,
  handleSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const getListUserSearch = () => {
    const search = inputRef.current?.value;
    if (search) {
      handleSearch(search);
    } else {
      handleSearch("");
    }
  };

  return (
    <div>
      <div className="main__title-form mr-2 flex items-center bg-[#151f30] rounded-full pr-2">
        <input
          ref={inputRef}
          onInput={Debounced(getListUserSearch, 1000)}
          type="search"
          placeholder={title}
        />
        <BiSearch />
      </div>
    </div>
  );
};

export default SearchContainer;
