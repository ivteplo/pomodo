import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import svg from "vite-svg-loader"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svg()],
})
