import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     VitePWA({
//       injectRegister: "false",
//       devOptions: {
//         enabled: true,
//       },
//       includeAssets: [
//         "icons/apple-touch-icon.png, icons/favicon.png, robots.txt, ",
//       ],
//       manifest: {
//         name: "Open Source, Open Science",
//         short_name: "Open Science",
//         description: "Distributed computings incredible response to COVID-19.",
//         theme_color: "#030b18",
//         background_color: "#030b18",
//         icons: [
//           {
//             src: "/icons/pwa-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/icons/pwa-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//           {
//             src: "/icons/pwa-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//             purpose: "any maskable",
//           },
//         ],
//       },
//     }),
//   ],
// });
