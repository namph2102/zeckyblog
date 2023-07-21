import { IDataBlog } from "./sevices/typedata";
import { getData } from "./sevices/untils";

const domain = process.env.DOMAIN_URL;
export default async function sitemap() {
  const data = await getData();
  const listurl = [
    domain,
    "https://zecky.online/",
    `${domain}/tim-kiem`,
    `${domain}/tim-tuc`,
  ];
  const listData = listurl.map((url) => ({
    url,
    lastModified: new Date().toISOString(),
  }));
  const listsitemapblog = data.map((blog: IDataBlog) => ({
    url: `${domain}/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));
  return [...listData, ...listsitemapblog];
}
