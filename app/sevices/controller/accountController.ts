import { DOMAIN_SEVER, customeAxios } from "../untils";

class AccountController {
  async getAllAccount(skip = 0, limit = 7, search = "") {
    const result = await customeAxios.post(
      DOMAIN_SEVER + "/admin/fullaccount",
      { data: { limit, skip, search } }
    );
    const data = await result.data;
    return data;
  }
  async updateAccount(idAccount: string, info: any) {
    const result = await customeAxios.put(
      DOMAIN_SEVER + "/admin/updateaccount",
      {
        data: { info, idAccount },
      }
    );
    const data = await result.data;
    return data;
  }
  async deleteAccount(idAccount: string) {
    const result = await customeAxios.delete(
      DOMAIN_SEVER + "/admin/account/" + idAccount
    );
    const data = await result.data;
    return data;
  }
  async getlistConmentFile(idAccount: string) {
    const result = await customeAxios.post(
      DOMAIN_SEVER + "/admin/comment/document",
      {
        data: idAccount,
      }
    );
    const data = await result.data;
    return data;
  }
  async deleteOneDocument(idComment: string, path: string, fileName: string) {
    const result = await customeAxios.put(
      DOMAIN_SEVER + "/admin/drive/deleteone",
      {
        data: { idComment, path, fileName },
      }
    );
    const data = await result.data;
    return data;
  }
  async deleteNotice(idAccount: string) {
    const result = await customeAxios.delete(
      DOMAIN_SEVER + "/admin/notice/" + idAccount
    );
    const data = await result.data;
    return data;
  }
  async deleteAllNotice() {
    const result = await customeAxios.delete(DOMAIN_SEVER + "/admin/noticeall");
    const data = await result.data;
    return data;
  }
}
export default new AccountController();
