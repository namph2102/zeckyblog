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
interface IIdataPageHome {
  listAccount: IAccount[];
  listBlog: IDataBlog[];
  listComment: Icomment[];
  listRooms: IRoom[];
}
class Admincontroller {
  accessToken = "";
  async getDataPageHome(accessToken: string) {
    this.accessToken = accessToken;
    const res = await customeAxios.get(DOMAIN_SEVER + "/admin/pagehome", {
      headers: { Authorization: "Bearer " + this.accessToken },
    });
    const data: IIdataPageHome = await res.data;
    return data;
  }
}
export default new Admincontroller();
