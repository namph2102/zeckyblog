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
  async getListAccountAdmin() {
    const res = await customeAxios.get(DOMAIN_SEVER + "/admin/listaccount", {});
    const data: Pick<IAccount, "_id" | "fullname">[] = await res.data;
    return data;
  }
  async getListNotice(idAccount: string, limit = 10, skip = 0) {
    const res = await customeAxios.post(DOMAIN_SEVER + "/admin/listnotice", {
      data: { idAccount, limit, skip },
    });
    const data = await res.data;
    return data;
  }
  async handleDeleteInfo(idInfo: string) {
    const res = await customeAxios.delete(
      DOMAIN_SEVER + "/info/admin/" + idInfo
    );
    const data = await res.data;
    return data;
  }
  async getListCate() {
    const res = await customeAxios.get(DOMAIN_SEVER + "/cate/admin/listcate");
    const data = await res.data;
    return data;
  }
  async updateCategory(info: any, idCate: string) {
    const res = await customeAxios.put(DOMAIN_SEVER + "/cate/admin/update", {
      data: { info, idCate },
    });
    const data = await res.data;
    return data;
  }
  async deleteCategory(idCate: string) {
    const res = await customeAxios.delete(
      DOMAIN_SEVER + "/cate/admin/delete/" + idCate
    );
    const data = await res.data;
    return data;
  }
  async listGoogleDrive() {
    const res = await customeAxios.post(DOMAIN_SEVER + "/admin/drive");
    const data = await res.data;
    return data;
  }
  async getListComment(author: string, limit = 6, skip = 0) {
    const res = await customeAxios.post(DOMAIN_SEVER + "/admin/comment/list", {
      data: { author, limit, skip },
    });
    const data = await res.data;
    return data;
  }
  async deletecomment(idComment: string) {
    const res = await customeAxios.delete(
      DOMAIN_SEVER + "/admin/comment/delete/" + idComment
    );
    const data = await res.data;
    return data;
  }
  async getListRoom(skip = 0, limit = 8) {
    const res = await customeAxios.post(DOMAIN_SEVER + "/admin/room/list", {
      data: { limit, skip },
    });
    const data = await res.data;
    return data;
  }
  async deleteRoomId(idRoom: string) {
    const res = await customeAxios.delete(
      DOMAIN_SEVER + "/admin/room/delete/" + idRoom
    );
    const data = await res.data;
    return data;
  }
}
export default new Admincontroller();
