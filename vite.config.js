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
        "icons/favicon.png",
        "icons/apple-touch-icon.png",
        "icons/pwa-192x192.png",
        "icons/pwa-512x512.png",
        "icons/mask-icon.svg",
      ],
      manifest: {
        name: "Open Source, Open Science",
        short_name: "Open Science",
        description: "Distributed computings incredible response to COVID-19.",
        theme_color: "#030b18",
        background_color: "#030b18",
        icons: [
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "ask maskable",
          },
        ],
      },
    }),
  ],
};
