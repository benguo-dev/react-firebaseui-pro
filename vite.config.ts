import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ReactFirebaseUIPro",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "react-dom": "ReactDOM",
        },
      },
    },
    minify: true,
    emptyOutDir: true
  },
})
