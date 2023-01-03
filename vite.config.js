import { resolve } from 'path';
import { defineConfig } from 'vite';

// src
// ├── package.json
// ├── vite.config.js
// ├── index.html
// ├── main.ts
// └── CH1.GoT
//     ├── index.html
//     └── got.ts

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        got: resolve(__dirname, 'CH1.GoT/index.html'),
      },
    },
  },
});
