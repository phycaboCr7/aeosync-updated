
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/', // Use absolute paths for normal deployment
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // Don't inline assets
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Don't split chunks for simpler deployment
      },
    },
  },
}));
