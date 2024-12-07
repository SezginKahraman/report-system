import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

// because __dirname was showing undefined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600, // Varsayılan 500 kB'dir, bunu 1600 kB olarak ayarlıyoruz
  },
});
