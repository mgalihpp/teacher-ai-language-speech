import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://guruai.my.id/",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      url: "https://guruai.my.id/chat",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://guruai.my.id/buy-credits",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
