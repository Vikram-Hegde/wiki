// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        name: "Figtree",
        cssVariable: "--font-figtree",
        provider: fontProviders.google(),
        weights: ["300 900"],
      },
      {
        name: "Playfair Display",
        cssVariable: "--font-playfair-display",
        provider: fontProviders.google(),
        weights: [400, 500, 600]
      }
    ]
  }
});
