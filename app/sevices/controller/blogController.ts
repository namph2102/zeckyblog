import { DOMAIN_SEVER, customeAxios } from "../untils";
import { IData, IDataBlog } from "../typedata";

class BlogController {
  userId = "";
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
  async getDashboardPage(skip = 10, limit = 10, userId = "", authorID = "") {
    if (!userId) return { total: 0, listBlog: [], totalView: 0 };
    this.userId = userId;
    const res = await customeAxios.post(this.pathUrlBlog + "/admin/blog", {
      data: { skip, limit, userId, authorID },
      message: "Lấy Nội dung",
    });
    const data: {
      total: number;
      listBlog: IDataBlog[];
      totalView: number;
    } = await res.data;
    return data;
  }
  async editBlog(data: any, idBlog: string) {
    const res = await customeAxios.patch(this.pathUrlBlog + "/admin/edit", {
      data: { data, idBlog },
      message: "Chỉnh sửa nội dung",
    });
    const result = await res.data;
    return result;
  }
  async deleteBlog(blogId: string) {
    const res = await customeAxios.delete(
      this.pathUrlBlog + "/admin/delete/" + blogId
    );
    const result = await res.data;
    return result;
  }
  async adminSearchBlog(search: string, userId = "") {
    console.log(search, userId);
    const res = await customeAxios.post(this.pathUrlBlog + "/admin/search", {
      data: { search, userId },
      message: "tìm kiếm theo userid",
    });
    const result = await res.data;
    return result;
  }
  async SearchPage(search: string) {
    const res = await customeAxios.post(this.pathUrlBlog + "/search", {
      data: search,
      message: "tìm kiếm",
    });
    const result = await res.data;
    return result;
  }
  async crawWebsite(link: string) {
    const res = await customeAxios.post(this.pathUrlBlog + "/admin/craw", {
      data: link,
      message: "tìm kiếm",
    });
    const result = await res.data;
    return result;
  }
}
export default new BlogController();
