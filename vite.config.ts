import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置Scss
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/sassConfig.scss";`,
      },
    },
  },
  server: {
    hmr: true,
    //vue3 vite配置热更新不用手动刷新
    // Listening on all local IPs
    // host: true,
  },

  define: {
    global: {},
  },
});
