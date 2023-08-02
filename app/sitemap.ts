import cateController, { ICateData } from "./sevices/controller/cateController";
import { IDataBlog } from "./sevices/typedata";
import { getData } from "./sevices/untils";

const domain = process.env.DOMAIN_URL;
export default async function sitemap() {
  const data = await getData();
  const listCategory = await cateController.getAllcate();
  const listurl = [
    domain,
    "https://zecky.online/",
    `${domain}/hoc-lap-trinh`,
    `${domain}/tin-tuc`,
  ];
  const listData = listurl.map((url) => ({
    url,
    lastModified: new Date().toISOString(),
  }));
  const listsitemapblog = data.map((blog: IDataBlog) => ({
    url: `${domain}/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));
  const listSiteMapCate =
    listCategory.listCate.map((cate: ICateData) => ({
      url: `${domain}/danh-muc/${cate.slug}`,
      lastModified: cate.updatedAt,
    })) || [];
  const listSiteSearch =
    listCategory.listCate.map((cate: ICateData) => ({
      url: `${domain}/tin-tuc?category=${cate.slug}`,
      lastModified: cate.updatedAt,
    })) || [];

  return [
    ...listData,
    ...listsitemapblog,
    ...listSiteMapCate,
    ...listSiteSearch,
  ];
}
