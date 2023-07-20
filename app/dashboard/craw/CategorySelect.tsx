"use client";
import cateController from "@/app/sevices/controller/cateController";
import { RootState } from "@/app/sevices/store";
import { capitalizeText, removeVietnameseTones } from "@/app/sevices/untils";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Select from "react-select";
import slugify from "slugify";
interface Iselect {
  value: string;
  lable: string;
}
interface CateGorySelectProps {
  setNewCatogory: (value: any) => any;
}
const CateGorySelect: React.FC<CateGorySelectProps> = ({ setNewCatogory }) => {
  const account = useSelector((state: RootState) => state.account.user);

  const [listCate, setListCate] = useState<Iselect[]>([]);
  const [isOpenSelect, setIsOpenSelect] = useState(true);
  const handleCreateCate = (formdata: FormData) => {
    const cate: any = formdata.get("cate") || "";
    if (!cate) return;
    if (cate && cate.value) {
      const data = {
        cate,
        slug: slugify(
          removeVietnameseTones(cate)
            .replace(/[^\w\s]/g, "")
            .toLowerCase()
        ),
        author: account._id,
      };

      cateController.createCate(data).then(({ cate }) => {
        if (cate && cate._id && cate.cate) {
          console.log(cate);
          const coverCata: any = {
            value: cate._id,
            label: capitalizeText(cate.cate),
          };
          toast.success("Tạo thành công danh mục mới");
          setNewCatogory(coverCata.value);
          setIsOpenSelect(false);
        }
      });
    }
  };
  useEffect(() => {
    cateController.getAllcate().then(({ listCate }) => {
      if (listCate && listCate.length > 0) {
        const coverlistCate = listCate.map((item: any) => ({
          value: item._id,
          label: capitalizeText(item.cate),
        }));

        setListCate(() => coverlistCate);
      }
    });
  }, []);
  const handleChange = (data: any) => {
    setNewCatogory(() => data);
    setIsOpenSelect(false);
  };

  return (
    <main className="text-black">
      <div className="ml-4">
        <ul className="text-yellow-300 text-sm mt-4 mb-2 list-disc marker:bg-yellow-500 ">
          <li>Nếu không tìm thấy chủ đề thì hãy tự thêm nhé</li>
          <li>Vui lòng chọn danh mục trước nhé</li>
        </ul>
      </div>
      {isOpenSelect && (
        <>
          <form action={handleCreateCate}>
            <input
              type="text"
              name="cate"
              className="text-sm py-2 px-2"
              placeholder="Tạo danh mục mới"
              required
              id=""
            />
            <div className="my-2 text-sm">
              <button
                type="submit"
                className="py-1 bg-yellow-400 px-5 rounded-full"
              >
                Tạo danh mục
              </button>
            </div>
          </form>
          <hr className="h-1 my-4" />

          <Select
            placeholder="Chọn danh mục có sẳn"
            closeMenuOnSelect={false}
            options={listCate}
            onChange={handleChange}
            id="long-value-select"
            instanceId="long-value-select"
          />
        </>
      )}
    </main>
  );
};
export default CateGorySelect;
