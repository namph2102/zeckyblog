import Link from "next/link";
import React from "react";
import {
  BsEye,
  BsChatLeftDots,
  BsBook,
  BsPerson,
  BsGraphDownArrow,
} from "react-icons/bs";
const DashBoard = () => {
  return (
    <main>
      <section className="my-3 border_line-style  border-b-2">
        <h1>Bảng điều kiển</h1>
      </section>
      <section>
        <div className="grid sm:grid-cols-4 grid-cols-2  gap-2">
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Tài khoản</p>
            <p className="flex justify-between">
              <span>5 678</span> <BsPerson />
            </p>
          </article>
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Bài viết</p>
            <p className="flex justify-between">
              <span>5 678</span> <BsBook />
            </p>
          </article>
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>Bình luận</p>
            <p className="flex justify-between">
              <span>5 678</span> <BsChatLeftDots />
            </p>
          </article>
          <article className="py-2 px-3 bg-primary rounded-3xl">
            <p>
              Đang hoạt động{" "}
              <span className="inline-block bg-green-800 rounded-full w-3 h-3 border-[1px] border-gray-100"></span>
            </p>
            <p className="flex justify-between">
              <span>5 678</span> <BsEye />
            </p>
          </article>
        </div>
      </section>
      <div className="grid sm:grid-cols-2 grid-cols-1  gap-2 mt-3">
        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Quản trị viên</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Họ Tên</span>
                </th>
                <th>Số Điện thoại</th>
                <th>Trạng thái</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border_line-style  border-b-2 text-xs">
                <td>
                  <span className="inline-block py-2"> Phạm Hoài Nam</span>
                </td>
                <td>
                  <span>0877666990</span>
                </td>
                <td>
                  <span>Đã khóa</span>
                </td>
                <td>
                  <span>Online</span>
                </td>
              </tr>
              <tr className="border_line-style  border-b-2 text-xs">
                <td>
                  <span className="inline-block py-2"> Phạm Hoài Nam</span>
                </td>
                <td>
                  <span>0877666990</span>
                </td>
                <td>
                  <span>Đã khóa</span>
                </td>
                <td>
                  <span>Online</span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Đang hoạt động</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Họ Tên</span>
                </th>
                <th>Số Điện thoại</th>
                <th>Trạng thái</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border_line-style  border-b-2 text-xs">
                <td>
                  <span className="inline-block py-2"> Phạm Hoài Nam</span>
                </td>
                <td>
                  <span>0877666990</span>
                </td>
                <td>
                  <span>Đã khóa</span>
                </td>
                <td>
                  <span>Online</span>
                </td>
              </tr>
              <tr className="border_line-style  border-b-2 text-xs">
                <td>
                  <span className="inline-block py-2"> Phạm Hoài Nam</span>
                </td>
                <td>
                  <span>0877666990</span>
                </td>
                <td>
                  <span>Đã khóa</span>
                </td>
                <td>
                  <span>Online</span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>

        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Bài viết</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Tiêu đề</span>
                </th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Xem bài viết</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border_line-style  border-b-2 text-xs">
                <td>
                  <span className="inline-block py-2 text_style-eclipse max-w-[100px]">
                    {" "}
                    Phạm Hoài Nam das sad sada sd
                  </span>
                </td>
                <td>
                  <span className="text_style-eclipse inline-block  max-w-[100px]">
                    dsa sad sad sadsad das ads sad
                  </span>
                </td>
                <td>
                  <span>Chờ kiểm duyệt</span>
                </td>
                <td>
                  <span>
                    <Link href="/here" className="active_href underline">
                      Tại đây
                    </Link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>

        <article className="bg-primary rounded-2xl p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-8">
                <BsGraphDownArrow />
              </span>
              <span>Nhóm</span>
            </div>
            <div className="text-sm bg-main rounded-full py-2 px-4">
              <Link href="/user">Xem tất cả</Link>
            </div>
          </div>
          <table className="table-auto text-sm w-full text-center">
            <thead className="border_line-style  border-b-2 text-sm">
              <tr>
                <th>
                  <span className="py-2 inline-block">Tên nhóm</span>
                </th>
                <th>Mô tả</th>
                <th>Thành viên</th>
                <th>Xem bài viết</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border_line-style  border-b-2 text-xs">
                <td>
                  <span className="inline-block py-2 text_style-eclipse max-w-[100px]">
                    {" "}
                    Phạm Hoài Nam das sad sada sd
                  </span>
                </td>
                <td>
                  <span className="text_style-eclipse inline-block  max-w-[100px]">
                    dsa sad sad sadsad das ads sad
                  </span>
                </td>
                <td>
                  <span>Chờ kiểm duyệt</span>
                </td>
                <td>
                  <span>
                    <Link href="/here" className="active_href underline">
                      Tại đây
                    </Link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </main>
  );
};

export default DashBoard;
