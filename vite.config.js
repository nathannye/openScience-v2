import { VitePWA } from "vite-plugin-pwa";

export default {
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "/favicon.png",
        "/apple-touch-icon.png",
        "/pwa-192x192.png",
        "/pwa-512x512.png",
        "/mask-icon.svg",
      ],
      manifest: {
        name: "Open Source, Open Science",
        short_name: "Open Science",
        description: "Distributed computings incredible response to COVID-19.",
        theme_color: "#030b18",
        background_color: "#030b18",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "ask maskable",
          },
        ],
      },
    }),
  ],
};
