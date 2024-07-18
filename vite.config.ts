import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: [
        { find: '@/', replacement: `${__dirname}/src/` },
      ],
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    server: mode === 'development' ? {
      proxy: {
        '/k': {
          target: env.VITE_KINTONE_BASE_URL,
          changeOrigin: true,
        },
      },
    } : {},
  }
})
