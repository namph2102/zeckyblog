import { IData } from "./sevices/typedata";
import { getData } from "./sevices/untils";
interface Fulldata extends IData {
  createdAt: string;
  updatedAt: string;
}
const domain = process.env.DOMAIN_URL;
export default async function sitemap() {
  const data = await getData();

  return data.map((blog: Fulldata) => ({
    url: `${domain}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));
}
