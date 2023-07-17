import { IData } from "./sevices/typedata";
import { getData } from "./sevices/untils";

const domain = process.env.DOMAIN_URL;
export default async function sitemap() {
  const data = await getData();

  return data.map((blog: IData) => ({
    url: `${domain}/blog/${blog.slug}`,
    lastModified: new Date().toISOString(),
  }));
}
