// [FILEPATH] vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url' // URL도 import 해주세요.

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()], // <-- 여기에 쉼표(,)가 필요합니다.
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      // 아래 라인을 추가하세요.
      "@common": fileURLToPath(new URL("./src/common", import.meta.url))
    },
  },
})