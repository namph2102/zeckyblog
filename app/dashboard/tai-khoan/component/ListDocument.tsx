import React, { useEffect, FC, useState } from "react";
import { BiTrash } from "react-icons/bi";
interface ListDocumentProps {
  idAccount: string;
}
import Image from "next/image";
import { CheckTypeImage, IFile, filePath } from "@/app/sevices/untils";
import accountController from "@/app/sevices/controller/accountController";
import { Pagination } from "@mui/material";
import { toast } from "react-hot-toast";
interface listFileDocument {
  file: IFile[];
  _id: string;
}
const pageinBlog = 4;
const ListDocument: FC<ListDocumentProps> = ({ idAccount }) => {
  const [listFileDocument, setListDocument] = useState<listFileDocument[]>([]);
  const [totalFile, setTotalFile] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    accountController.getlistConmentFile(idAccount).then((data) => {
      if (data && data.length > 0) {
        setListDocument(data);
        const totalLength = data.flatMap((item: any) => item.file)?.length || 1;
        setTotalFile(totalLength);
      }
    });
  }, []);
  const handleDeletecomment = (
    idComment: string,
    path: string,
    fileName: string
  ) => {
    if (confirm("Bạn chắc chắc là xóa không?")) {
      accountController
        .deleteOneDocument(idComment, path, fileName)
        .then((message) => {
          document.getElementById("file-name-" + path)?.classList.add("hidden");
          toast.success(message), setTotalFile((prev) => prev - 1);
        })
        .catch(() => {
          toast.error("Thao tác thất bại");
        });
    }
  };
  const totalPage = Math.ceil(totalFile / pageinBlog);
  const handleChangePage = (event: any, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {totalFile > 0 ? (
        <table className="table-auto text-sm w-full text-center border-collapse ">
          <thead className="border_line-style  border-b-2 text-sm">
            <tr>
              <th>
                <span className="py-2 inline-block px-4">Tên thư mục</span>
              </th>
              <th>
                <span className="py-2 inline-block px-4">Dung lượng</span>
              </th>

              <th>
                <span className="py-2 px-4">Hành động</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {listFileDocument
              .slice((currentPage - 1) * pageinBlog, currentPage * pageinBlog)
              .map((item) =>
                item.file.map((file) => {
                  const pathfile: any = file.fileName.split(".").pop();
                  const namePath = filePath[pathfile];

                  return (
                    <tr
                      id={`file-name-${file.path}`}
                      key={file.path}
                      className="border-white border-b-[1px]"
                    >
                      <td>
                        <div className="py-2  px-2 flex items-center gap-2 min-w-[200px] line-clamp-1">
                          {CheckTypeImage(file.fileName) ? (
                            <Image
                              src={file.url}
                              className="h-auto object-cover w-full"
                              alt="error"
                              width={100}
                              height={30}
                            />
                          ) : (
                            <Image
                              src={
                                namePath ? `/${namePath}.png` : `/document.png`
                              }
                              width={48}
                              height={48}
                              className="object-cover"
                              alt="logo"
                            />
                          )}

                          <span className="whitespace-nowrap inline-block px-2">
                            {file.fileName}
                          </span>
                        </div>
                      </td>
                      <td>{file.size.toFixed(2)} KB</td>
                      <td>
                        <span className="text-3xl">
                          <button
                            onClick={() =>
                              handleDeletecomment(
                                item._id,
                                file.path,
                                file.fileName
                              )
                            }
                            className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
                          >
                            <BiTrash />
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-yellow-600 font-semibold">
          Không tồn tại tài liệu nào
        </p>
      )}
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

export default ListDocument;
