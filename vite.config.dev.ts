import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import webfontDownload from 'vite-plugin-webfont-dl';
import tsconfigPaths from 'vite-tsconfig-paths';

export const devConfig = {
   server: {
      open: '/',
      port: 5500,
   },
   plugins: [
      tsconfigPaths(),
      react({
         babel: {
            plugins: [['babel-plugin-react-compiler']],
         },
      }),
      webfontDownload(),
      checker({ typescript: true }),
   ],
   base: '',
   resolve: {
      alias: {
         '@': '/src',
         '@components/*': '/src/components',
         '@services/*': '/src/services',
         '@assets/*': '/src/assets',
         '@router/*': '/src/router',
         '@pages/*': '/src/pages',
         '@hooks/*': '/src/hooks',
         '@tools/*': '/src/tools',
         '@events/*': '/src/events',
         '@api/*': '/src/api',
      },
   },
   css: {
      devSourcemap: true,
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
};
