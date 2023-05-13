import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./docs",
    assetsInlineLimit: 0
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
      },
      manifest: {
        background_color: "#ffffff",
        theme_color: "#ffffff",
        name: "HHH",
        short_name: "HHH",
        start_url: "/HHH/",
        display: "standalone",
        icons: [
          {
            src: "icon.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
  base: "./",
});