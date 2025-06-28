import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ["src/**/*"],
      outDir: 'dist/types'
    }),
    federation({
      name: 'todo_header',
      filename: 'index.js',
      remotes: {
        'ui-kit': 'http://localhost:5176/assets/index.js',
        shared: 'http://localhost:5177/assets/index.js',
      },
      exposes: {
        './components/TodoHeader': './src/components/TodoHeader/index.ts'
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 5174,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
