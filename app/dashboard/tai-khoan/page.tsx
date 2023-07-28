"use client";
import { IAccount } from "@/app/sevices/store/slice/AccountSlice";
import React, { useCallback, useEffect, useState } from "react";
import AccountItem from "./component/AccountItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/sevices/store";
import accountController from "@/app/sevices/controller/accountController";
import LoadingPage from "@/app/component/LoadingPage";
import { Pagination } from "@mui/material";
import SearchContainer from "../component/form/SearchContainer";
import { BiX } from "react-icons/bi";
import ProfileContainer from "./component/ProfileContainer";

const AccountDashboard = () => {
  const account = useSelector((state: RootState) => state.account.user);
  const pageinBlog = 8;
  const [listAccount, setListAccount] = useState<IAccount[]>([]);
  const [total, setTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [accountEdit, setAccountEdit] = useState("");

  useEffect(() => {
    if (account._id && !accountEdit) {
      accountController
        .getAllAccount((currentPage - 1) * pageinBlog, pageinBlog)
        .then((data) => {
          setListAccount(data.listAccount), setTotal(data.totalAccount);
        });
    }
  }, [account._id, currentPage, accountEdit]);
  // handle search
  const handleSearch = useCallback(
    (search: string) => {
      accountController
        .getAllAccount((currentPage - 1) * pageinBlog, pageinBlog, search)
        .then((data) => {
          setListAccount(data.listAccount), setTotal(data.totalAccount);
        });
    },
    [account._id]
  );

  const handleChangePage = useCallback((e: any, page: number) => {
    setCurrentPage(page);
  }, []);
  // search account

  if (!account._id) return <LoadingPage />;
  const totalPage = Math.ceil(total / pageinBlog);

  const accountField: any = accountEdit
    ? listAccount.find((ac) => ac._id == accountEdit)
    : {};

  return (
    <div>
      <section className="my-3 border_line-style  border-b-2 ">
        <div className="flex  justify-between items-center w-full">
          <div className="flex gap-2 items-center">
            <h1>Tài khoản</h1>
            <p className="font-bold text-base text-yellow-600">{total}</p>
          </div>

          <SearchContainer
            idAccount={account._id}
            handleSearch={handleSearch}
            title="Tìm kiếm tài khoản...."
          />
        </div>
      </section>
      <section className="min-h-[80vh] lg:w-full w-[100vw] overflow-x-auto scroolbar ">
        <table className="table-auto text-sm w-full text-center">
          <thead className="border_line-style  border-b-2 text-sm">
            <tr>
              <th>
                <span className="py-2 px-4">Thông tin</span>
              </th>
              <th>
                <span className="py-2 px-4">Tài khoản</span>
              </th>
              <th>
                <span className="py-2 px-4">Vai trò</span>
              </th>
              <th>
                <span className="py-2 px-4">Lượt sử dụng </span>
              </th>
              <th>
                <span className="py-2 px-4">Ngày tham gia </span>
              </th>
              <th>
                <span className="py-2 px-4">Hoạt động </span>
              </th>
              <th colSpan={3}>
                <span className="py-2 px-4 min-w-[200px]">Hành động </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listAccount.map((acc) => (
              <AccountItem
                setTotal={setTotal}
                setAccountEdit={setAccountEdit}
                key={acc._id}
                account={acc}
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
      {accountEdit && (
        <section className="fixed  top-0 left-0 right-0 bg-black z-50 min-h-screen overflow-y-auto">
          <button
            onClick={() => setAccountEdit("")}
            className="absolute top-2 right-2 text-4xl"
          >
            <BiX />
          </button>
          <div className="px-8 py-2">
            <ProfileContainer
              account={accountField}
              setAccountEdit={setAccountEdit}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default AccountDashboard;
