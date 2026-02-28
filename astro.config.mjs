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
        weights: [400, 500],
      },
      {
        name: "Playfair Display",
        cssVariable: "--font-playfair-display",
        provider: fontProviders.google(),
        weights: [400, 500]
      },
      {
        name: "JetBrains Mono",
        cssVariable: "--font-jetbrains-mono",
        provider: fontProviders.google(),
        weights: [400]
      }
    ]
  }
});
