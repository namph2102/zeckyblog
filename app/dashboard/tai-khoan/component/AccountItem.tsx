import accountController from "@/app/sevices/controller/accountController";
import { IAccount } from "@/app/sevices/store/slice/AccountSlice";
import {
  HandleTimeDiff,
  checkImageUrl,
  componentsProps,
  formatNumber,
} from "@/app/sevices/untils";
import moment from "moment";
import Image from "next/image";
import React, { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BiEditAlt, BiTrash, BiLock, BiLockOpen, BiX } from "react-icons/bi";
import ProfileContainer from "./ProfileContainer";
import { Tooltip } from "@mui/material";

interface AccountItemProps {
  account: IAccount;
  setAccountEdit: (_id: string) => void;
  setTotal: (total: any) => any;
}
const AccountItem: FC<AccountItemProps> = ({
  account,
  setTotal,
  setAccountEdit,
}) => {
  const ElementREF: React.LegacyRef<HTMLTableRowElement> = useRef(null);
  const [isStatus, setIsStatus] = useState(!account.blocked);

  const handleDeleteAccount = (idAccount: string) => {
    const result = confirm("Bạn chắc là muốn xóa không?");
    if (!result) return;
    accountController
      .deleteAccount(idAccount)
      .then((message) => {
        if (ElementREF.current) {
          ElementREF.current.classList.add("hidden");
          toast.success(message);
          setTotal((total: number) => total - 1);
        }
      })
      .catch(() => toast.error("Xóa thất bại"));
  };
  const updateStatus = (idAccount: string) => {
    console.log(isStatus);
    confirm(
      isStatus ? "Bạn sẽ khóa tài khoản này?" : "Bạn sẽ mở khóa tài khoản này?"
    ) &&
      accountController
        .updateAccount(idAccount, { blocked: isStatus, accessToken: "reset" })
        .then(() => {
          toast.success(
            isStatus ? "Tài khoản này đã bị khóa" : "Tài khoản này đã mở khóa"
          );
          setIsStatus((pre) => !pre);
        })
        .catch(() => toast.error("Cập nhập thất bại"));
  };
  return (
    <tr ref={ElementREF} className="border_line-style border-b-2 text-xs">
      <td>
        <span className="flex gap-2 items-center capitalize w-[200px] pl-4">
          <Image
            width={40}
            height={40}
            alt={account.fullname}
            src={
              checkImageUrl(account.avatar)
                ? account.avatar
                : "http://flixtv.volkovdesign.com/admin/img/user.svg"
            }
            className="2-10 h-10 object-cover rounded-xl"
          />
          {account.fullname}
        </span>
      </td>

      <td>
        <span className="px-2  whitespace-nowrap">{account.username}</span>
      </td>
      <td>
        <span className="px-2  whitespace-nowrap">{account.permission}</span>
      </td>
      <td>
        <span className="px-2 capitalize whitespace-nowrap">
          {formatNumber(account.joinWeb)}
        </span>
      </td>

      <td>
        <span className="px-2 capitalize whitespace-nowrap">
          {moment(account.createdAt).format("HH:mm:ss - DD/MM/YYYY")}
        </span>
      </td>
      <td>
        <span className="px-2 capitalize whitespace-nowrap">
          {account.status ? (
            <strong className="text-green-600 font-blod font-semibold">
              Online
            </strong>
          ) : (
            HandleTimeDiff(account.timeOff || account.updatedAt)
          )}
        </span>
      </td>

      <td>
        <span className="flex text-xl justify-center text-red-500 gap-2 news_action py-2 z-50 shadow-2xl whitespace-nowrap min-w-[250px]">
          <Tooltip
            componentsProps={componentsProps}
            arrow
            title={isStatus ? "Chưa khóa" : "Đang bị khóa"}
          >
            <button
              onClick={() => updateStatus(account._id)}
              className={`p-2 rounded-full ${
                isStatus
                  ? "text-green-500 bg-green-600/20 hover:bg-green-600/50"
                  : "text-red-500 bg-red-600/20 hover:bg-red-600/50 "
              }`}
            >
              {!isStatus ? <BiLock /> : <BiLockOpen />}
            </button>
          </Tooltip>
          <Tooltip
            componentsProps={componentsProps}
            arrow
            title="Chỉnh sửa tài khoản"
          >
            <button
              onClick={() => setAccountEdit(account._id)}
              className="bg-blue-600/20 hover:bg-blue-600/50 p-2 rounded-full  text-blue-500"
            >
              <BiEditAlt />
            </button>
          </Tooltip>
          <Tooltip
            componentsProps={componentsProps}
            arrow
            title="Xóa tài khoản"
          >
            <button
              onClick={() => handleDeleteAccount(account._id)}
              className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
            >
              <BiTrash />
            </button>
          </Tooltip>
        </span>
      </td>
    </tr>
  );
};

export default AccountItem;
