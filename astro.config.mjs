import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://mongeortopedia.com/",
  integrations: [
    tailwind(),
    react(),
    robotsTxt(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    playformCompress(),
  ],
});
