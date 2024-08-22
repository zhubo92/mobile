import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VantResolver } from "@vant/auto-import-resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: `@import "${path.resolve(__dirname, "./src/styles/vant.less")}";`
      }
    }
  },
  server: {
    host: true,
    port: 8989,
    proxy: {
      "/api": {
        target: "http://localhost:8860/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
