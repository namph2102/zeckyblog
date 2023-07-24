import { IAccount } from "../store/slice/AccountSlice";
import { IDataBlog } from "../typedata";
import { DOMAIN_SEVER, customeAxios } from "../untils";
export interface Icomment {
  _id: string;
  comment: string;
  author: {
    fullname: string;
    blocked: boolean;
    avatar: string;
  };
}
export interface IRoom {
  _id: string;
  listUser: string[];
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  des: string;
}
export interface IIdataPageHome {
  listAccount: IAccount[];
  listAccountOnline: IAccount[];
  listBlog: IDataBlog[];
  totalComent: number;
  totalAccount: number;
  listRooms: IRoom[];
  totalBlog: number;
  totalAccountOnline: number;
}
class Admincontroller {
  accessToken = "";
  async getDataPageHome(accessToken: string, idAccount: string) {
    this.accessToken = accessToken;
    const res = await customeAxios.post(DOMAIN_SEVER + "/admin/pagehome", {
      headers: { Authorization: "Bearer " + this.accessToken },
      data: idAccount,
    });
    const data: IIdataPageHome = await res.data;
    return data;
  }
}
export default new Admincontroller();
