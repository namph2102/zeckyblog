"use client";
import { RootState } from "@/app/sevices/store";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import RoomItem from "./RoomItem";
import adminController from "@/app/sevices/controller/adminController";
import { toast } from "react-hot-toast";
export interface IRoomGroup {
  _id: string;
  type: "friend" | "group";
  listUser: string[];
  avatar: {
    path: string;
    url: string;
  };

  role: {
    fullname: string;
  };
  name: string;
  createdAt: string;
}
const RoomController = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const pageInBlog = 10;
  const [listRoom, setListRoom] = useState<IRoomGroup[]>([]);
  const [totalLength, setTotaLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!account._id) return;
    adminController
      .getListRoom((currentPage - 1) * pageInBlog, pageInBlog)
      .then((data) => {
        setTotaLength(data.total);
        setListRoom(data.listRoom);
      });
  }, [account._id, currentPage]);
  const handleChangePage = (event: any, page: number) => {
    setCurrentPage(page);
  };
  const handleDeleteRoom = async (id: string) => {
    const result = confirm("Bạn chắc sẽ xóa phòng này?");
    if (!result) return;
    try {
      await adminController.deleteRoomId(id);
      toast.success("Xóa phòng thành công");
      setTotaLength((prev) => prev - 1);
      setListRoom((prev) => prev.filter((i) => i._id !== id));
    } catch {
      toast.error("Xóa phòng thất bại");
    }
  };
  const totalPage = Math.ceil(totalLength / pageInBlog);
  return (
    <div>
      <section className="my-3 border_line-style  border-b-2 flex lg:flex-row flex-col justify-between items-center">
        <h1>Danh sách phòng</h1>
      </section>
      <section className="min-h-[80vh] lg:w-full w-[100vw] overflow-x-auto scroolbar ">
        <table className="table-auto text-sm w-full text-center">
          <thead className="border_line-style  border-b-2 text-sm">
            <tr>
              <th>
                <span className="py-2 px-4">Kiểu phòng</span>
              </th>
              <th>
                <span className="py-2 px-4">Số lượng tham gia</span>
              </th>
              <th>
                <span className="py-2 px-4">Người tạo</span>
              </th>
              <th>
                <span className="py-2 px-4">Ảnh phòng</span>
              </th>
              <th>
                <span className="py-2 px-4">Ngày tạo</span>
              </th>
              <th>
                <span className="py-2 px-4">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listRoom.map((r) => (
              <RoomItem
                handleDeleteRoom={handleDeleteRoom}
                room={r}
                key={r._id}
              />
            ))}
          </tbody>
        </table>
        {totalPage > 1 && (
          <section className="text-white panation flex justify-center mt-4">
            <Pagination
              onChange={handleChangePage}
              color="secondary"
              count={totalPage}
              page={currentPage}
              defaultPage={1}
              boundaryCount={totalPage > 10 ? 2 : 1}
            />
          </section>
        )}
      </section>
    </div>
  );
};

export default RoomController;
