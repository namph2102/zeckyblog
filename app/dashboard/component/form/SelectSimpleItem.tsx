import React, { FC, useState } from "react";
import Select from "react-select";
export interface ISelect {
  value: string;
  label: string;
}
interface SelectSimpleItem {
  title: string;
  listCate: ISelect[];
  handleChange: (value: any) => void;
}

const SelectSimpleItem: FC<SelectSimpleItem> = ({
  handleChange,
  listCate,
  title,
}) => {
  return (
    <div className="text-black text-sm">
      <Select
        placeholder={title}
        closeMenuOnSelect={false}
        options={[{ value: "", label: "Lấy tất cả" }, ...listCate]}
        onChange={handleChange}
        id="long-value-select"
        instanceId="long-value-select"
        className="max-w-[400px] min-w-[300px] z-10 my-2 sm:my-0 bg-main"
      />
    </div>
  );
};

export default SelectSimpleItem;
