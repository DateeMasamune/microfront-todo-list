import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        'header-todo': 'http://localhost:5174/assets/index.js',
        'row-todo': 'http://localhost:5175/assets/index.js',
        shared: 'http://localhost:5177/assets/index.js',
        'ui-kit': 'http://localhost:5176/assets/index.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
