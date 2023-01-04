import { resolve } from 'path';
import { defineConfig } from 'vite';

// src
// ├── package.json
// ├── vite.config.js
// ├── index.html
// ├── main.ts
// └── CH1.GoT
//     ├── index.html
//     └── main_got.ts

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        main_got: resolve(__dirname, 'CH1.GoT/index.html'),
        main_got2: resolve(__dirname, 'CH2.GoT/index.html'),
      },
    },
  },
});
