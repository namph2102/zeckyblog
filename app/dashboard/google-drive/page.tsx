import React from "react";

const page = () => {
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
                <span className="py-2 px-4">Tên danh mục</span>
              </th>
              <th>
                <span className="py-2 px-4">Slug</span>
              </th>
              <th>
                <span className="py-2 px-4">Mô tả</span>
              </th>
              <th>
                <span className="py-2 px-4">Ảnh Seo</span>
              </th>
              <th>
                <span className="py-2 px-4">Ngày tạo</span>
              </th>
              <th colSpan={4}>
                <span className="py-2 px-4">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        {/* {totalPage > 1 && (
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
      )} */}
      </section>
    </div>
  );
};

export default page;
