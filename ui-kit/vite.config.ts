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
      name: 'ui-kit',
      filename: 'index.js',
      remotes: {
        shared: 'http://localhost:5177/assets/index.js',
      },
      exposes: {
        './Input': './src/components/Input/index.ts',
        './Button': './src/components/Button/index.ts',
        './Checkbox': './src/components/Checkbox/index.ts',
        './Modal': './src/components/Modal/index.ts'
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 5176,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  }
})
