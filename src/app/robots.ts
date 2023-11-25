import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: "https://bloom-three-flame.vercel.app/sitemap.xml",
    host: "https://bloom-three-flame.vercel.app",
  }
}