import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'vitest.setup.ts',
      coverage: {
         provider: 'v8',
         exclude: [
            '**/*.d.ts',
            '**/*.css',
            '**/*.scss',
            '**/vite.config.dev.ts',
            '**/vite.config.prod.ts',
            '**/vite.config.ts',
            '**/vite.testconfig.ts',
            '**/postcss.config.js',
            '**/.eslintrc.cjs',
            '**/node_modules/**',
            '**/.git/**',
         ],
      },
   },
   base: '',
   resolve: {
      alias: {
         '@': '/src',
      },
   },
   css: {
      devSourcemap: false,
      modules: {
         localsConvention: 'camelCase',
      },
      preprocessorOptions: {
         scss: {
            silenceDeprecations: ['legacy-js-api'],
            additionalData: `@use "@/scss/tools/vars" as v; @use "@/scss/tools/mixins" as m; @use "@/scss/tools/functions" as f; @use "@/scss/tools/extends";`,
         },
      },
   },
});
