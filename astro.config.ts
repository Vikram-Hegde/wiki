import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700, 800],
    },
  ],
});
