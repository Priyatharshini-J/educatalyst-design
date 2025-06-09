import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "^/accounts/.*": {
        target:
          "https://slate-template-apps-773793963.development.catalystserverless.com",
        changeOrigin: true
      },
      "^/baas/v1/.*": {
        target:
          "https://console.catalyst.zoho.com",
        changeOrigin: true
      },
      "^/__catalyst/.*": {
        target:
          "https://slate-template-apps-773793963.development.catalystserverless.com",
        changeOrigin: true
      },
      "^/oauthorize": {
        target:
          "https://accounts.zoho.com",
        changeOrigin: true
      },
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
