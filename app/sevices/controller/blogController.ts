import axios from "axios";
import { DOMAIN_SEVER, customeAxios } from "../untils";
import { IData } from "../typedata";

class BlogController {
  pathUrlBlog = DOMAIN_SEVER + "/blog";
  async getAllBlogFromSever() {
    const res = await customeAxios.get(this.pathUrlBlog + "/allblog");
    const data = await res.data;
    return data;
  }
  async createNewblog(blog: IData) {
    const res = await customeAxios.post(this.pathUrlBlog + "/create", {
      data: blog,
      message: "Tạo bài viết mới",
    });
    const data = await res.data;
    return data;
  }
}
export default new BlogController();
