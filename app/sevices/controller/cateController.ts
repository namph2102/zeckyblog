import { DOMAIN_SEVER, customeAxios } from "../untils";

export interface ICateCreate {
  slug: string;
  cate: string;
  author: string;
}
class CateController {
  async createCate(data: ICateCreate) {
    const res = await customeAxios.post("/cate/ceate", { data });
    const result = await res.data;
    return result;
  }
  async getAllcate() {
    const res = await customeAxios.get("/cate");
    const data = await res.data;
    return data;
  }
}
export default new CateController();
