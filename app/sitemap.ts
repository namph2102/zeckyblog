import { getData } from "./sevices/untils";
const domain = process.env.DOMAIN_URL;
export default async function sitemap() {
  const data = await getData();
  return data.map((blog: { id: string }) => ({
    url: `${domain}/blog/${blog.id}`,
    lastModified: new Date().toISOString(),
  }));
}
