import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GOLASON.COM • Футбольная Жара",
    short_name: "GOLASON",
    description:
      "Двуязычное (RU/EN) футбольное издание: хроника матчей, тактический разбор, трансферное досье и таблицы 2026/27.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#111827",
    icons: [
      {
        src: "/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
