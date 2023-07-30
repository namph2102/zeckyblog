import adminController from "@/app/sevices/controller/adminController";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import ImageItem from "./ImageItem";
import { toast } from "react-hot-toast";
import moment from "moment";
interface ListCommentProps {
  id: string;
}
interface listCommentProps {
  _id: string;
  comment: string;
  type: string;
  createdAt: string;
  file: {
    url: string;
    path: string;
    fileName: string;
  }[];
}
const ListComment: React.FC<ListCommentProps> = ({ id }) => {
  const pageinBlog = 6;
  const [listComment, setListComment] = useState<listCommentProps[]>([]);
  const [total, setTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    adminController
      .getListComment(id, pageinBlog, (currentPage - 1) * pageinBlog)
      .then((data) => {
        setListComment(data.listComments || []);
        setTotal(data.totalComment || 1);
      });
  }, [id, currentPage]);
  const totalPage = Math.ceil(total / pageinBlog);
  const handleChangePage = (event: any, page: number) => {
    setCurrentPage(page);
  };
  const handleDelete = async (id: string) => {
    try {
      await adminController.deletecomment(id);
      setListComment((prev) => prev.filter((item) => item._id !== id));
      setTotal((totals) => totals - 1);
      toast.success("Bạn xóa thành công bình luận này");
    } catch {
      toast.error("Bạn xóa thành công bình luận này");
    }
  };
  return (
    <div>
      <table className="table-auto text-sm w-full text-center border-collapse ">
        <thead className="border_line-style  border-b-2 text-sm">
          <tr>
            <th>
              <span className="py-2 inline-block px-4">Nội Dung</span>
            </th>
            <th>
              <span className="py-2 inline-block px-4">Kiểu</span>
            </th>
            <th>
              <span className="py-2 inline-block px-4">Ảnh</span>
            </th>
            <th>
              <span className="py-2 inline-block px-4">Ngày tạo</span>
            </th>
            <th>
              <span className="py-2 px-4">Hành động</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {listComment.map((comment) => (
            <tr key={comment._id}>
              <td>
                <span
                  className="px-2 max-w-[200px]"
                  dangerouslySetInnerHTML={{ __html: comment.comment }}
                />
              </td>
              <td>
                <span>{comment.type}</span>
              </td>
              <td>
                <span className="flex justify-center gap-1">
                  {comment?.file?.length > 0
                    ? comment?.file.map((file) => (
                        <ImageItem
                          path={file.path}
                          fileName={file.fileName}
                          url={file.url}
                          idComment={comment._id}
                          key={file.path}
                        />
                      ))
                    : "không có"}
                </span>
              </td>
              <td>
                <span>
                  {moment(comment.createdAt).format("HH:mm:ss DD/MM/YYYY")}
                </span>
              </td>
              <td>
                <span className="text-3xl">
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
                  >
                    <BiTrash />
                  </button>
                </span>
              </td>
            </tr>
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
    </div>
  );
};

export default ListComment;
