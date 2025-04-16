
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Get the repository name from GitHub Pages URL (e.g., username.github.io/repo-name)
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.NODE_ENV === 'production' && repositoryName ? `/${repositoryName}/` : '/';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base,
  server: {
    host: "::",
    port: 8080,
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
