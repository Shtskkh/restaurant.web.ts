import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import TanStackRouterVite from "@tanstack/router-plugin/vite"; // https://vite.dev/config/

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7280",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
