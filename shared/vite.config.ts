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
      name: 'shared',
      filename: 'index.js',
      exposes: {
        './constants': './src/constants/index.ts',
        './context': './src/context/index.ts',
        './store': './src/store/index.ts'
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 5177,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  }
})

