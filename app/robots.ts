import { MetadataRoute } from "next";
const domain = process.env.DOMAIN_URL;
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
