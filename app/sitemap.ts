import { IData } from "./sevices/typedata";
import { getData } from "./sevices/untils";
interface Fulldata extends IData {
  createdAt: string;
  updatedAt: string;
}
const domain = process.env.DOMAIN_URL;
export default async function sitemap() {
  const data = await getData();
  const listurl = ["https://blog.zecky.online", "https://zecky.online/"];
  const listData = listurl.map((url) => ({
    url,
    lastModified: new Date().toISOString(),
  }));
  const listsitemapblog = data.map((blog: Fulldata) => ({
    url: `${domain}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));
  return [...listData, ...listsitemapblog];
}
