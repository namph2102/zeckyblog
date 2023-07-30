import React from "react";
import { BiTrash } from "react-icons/bi";
import { IRoomGroup } from "./page";
import { checkImageUrl } from "@/app/sevices/untils";
import moment from "moment";
interface RoomItemPorps {
  room: IRoomGroup;
  handleDeleteRoom: (id: string) => void;
}
const RoomItem: React.FC<RoomItemPorps> = ({ room, handleDeleteRoom }) => {
  return (
    <tr>
      <td>
        <span className="capitalize"> {room.type}</span>
      </td>
      <td>
        <span>{room.listUser.length}</span>
      </td>
      <td>
        <span className="capitalize px-2">
          {room?.role?.fullname || "không có"}
        </span>
      </td>

      <td>
        <span className="flex justify-center items-center min-w-[120px] gap-2 ">
          <img
            src={
              checkImageUrl(room.avatar.url)
                ? room.avatar.url
                : "https://zecky.online/images/defaultlavata.png"
            }
            width={20}
            height={20}
            alt="errr"
          />
          {room.name}
        </span>
      </td>
      <td>
        <span className="capitalize px-2">
          {moment(room.createdAt).format("HH:mm:ss - DD/MM/YYYY")}
        </span>
      </td>
      <td>
        <span className="text-3xl">
          <button
            onClick={() => handleDeleteRoom(room._id)}
            className="bg-red-600/20 hover:bg-red-600/50 p-2 rounded-full  text-red-500"
          >
            <BiTrash />
          </button>
        </span>
      </td>
    </tr>
  );
};

export default RoomItem;
