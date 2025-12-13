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
      }
    ]
  }
});
