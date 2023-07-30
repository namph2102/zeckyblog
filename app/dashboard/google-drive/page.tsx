"use client";
import adminController from "@/app/sevices/controller/adminController";
import { RootState } from "@/app/sevices/store";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import GoogleDriveItem from "./GoogleDriveItem";
import { Pagination } from "@mui/material";
import { deleteFileUpload } from "@/app/sevices/untils";
export interface IGoogleDrive {
  id: string;
  kind: string;
  mimeType: string;
  name: string;
}
const GoogleDriveDashboard = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const pageInBlog = 10;
  const [listGoogle, setListGoogle] = useState<IGoogleDrive[]>([]);
  const [totalLength, setTotaLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (account._id) {
      adminController.listGoogleDrive().then((data) => {
        setListGoogle(data);
        setTotaLength(data.length);
      });
    }
  }, [account._id]);
  const handleChangePage = (event: any, page: number) => {
    setCurrentPage(page);
  };
  const handleDelete = async (id: string) => {
    await deleteFileUpload(id);
    setListGoogle((prev) => prev.filter((item) => item.id !== id));
    setTotaLength((prev) => prev - 1);
  };
  const totalPage = Math.ceil(totalLength / pageInBlog);
  return (
    <div>
      <section className="my-3 border_line-style  border-b-2 flex lg:flex-row flex-col justify-between items-center">
        <h1>Google Drive</h1>
      </section>
      <section className="min-h-[80vh] lg:w-full w-[100vw] overflow-x-auto scroolbar ">
        <table className="table-auto text-sm w-full text-center">
          <thead className="border_line-style  border-b-2 text-sm">
            <tr>
              <th>
                <span className="py-2 px-4">Name</span>
              </th>
              <th>
                <span className="py-2 px-4">Kind</span>
              </th>
              <th>
                <span className="py-2 px-4">MimeType</span>
              </th>
              <th>
                <span className="py-2 px-4">Ảnh</span>
              </th>
              <th>
                <span className="py-2 px-4">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listGoogle
              .slice((currentPage - 1) * pageInBlog, pageInBlog * currentPage)
              .map((item) => (
                <GoogleDriveItem
                  handleDelete={handleDelete}
                  key={item.id}
                  item={item}
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

export default GoogleDriveDashboard;
