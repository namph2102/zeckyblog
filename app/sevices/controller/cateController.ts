import { customeAxios } from "../untils";

export interface ICateCreate {
  slug: string;
  cate: string;
  author: string;
}
export interface ICateData extends ICateCreate {
  des: string;
  image: string;
  pathImage: string;
  createdAt: string;
  updatedAt: string;
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
  
  async getblogfollowCate(slug: string, limit = 30) {
    const res = await customeAxios.post(`/cate/blog/slug`, {
      data: { slug, limit },
      method: "POST",
    });
    const data = await res.data;
    return data;
  }
  async getCateDetail(slug: string, limit = 30) {
    const res = await customeAxios.post(`/cate/getslug`, {
      data: { slug, limit },
      method: "POST",
    });
    const data = await res.data;
    return data;
  }
}
export default new CateController();
