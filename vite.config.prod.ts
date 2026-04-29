import favicon from '@axelrindle/vite-plugin-favicon';
import react from '@vitejs/plugin-react';
import cleanPlugin from 'vite-plugin-clean';
import viteImagemin from 'vite-plugin-imagemin';
import webfontDownload from 'vite-plugin-webfont-dl';
import tsconfigPaths from 'vite-tsconfig-paths';

const srcFolder = `./src`;
const publicFolder = `./public`;

export const paths = {
   src: {
      spriteIcons: `${srcFolder}/assets/icons/**/*.svg`,
      favIcon: `${srcFolder}/assets/favicon.svg`,
   },
   public: {
      assets: `${publicFolder}/assets`,
   },
};

export const prodConfig = {
   plugins: [
      react({
         babel: {
            plugins: [['babel-plugin-react-compiler']],
         },
      }),
      cleanPlugin(),
      tsconfigPaths(),
      webfontDownload(),
      viteImagemin({
         gifsicle: {
            optimizationLevel: 3,
            interlaced: false,
         },
         optipng: {
            optimizationLevel: 3,
         },
         mozjpeg: {
            quality: 83,
         },
         pngquant: {
            quality: [0.8, 0.9],
            speed: 4,
         },
         svgo: {
            plugins: [
               {
                  name: 'removeViewBox',
                  active: false,
               },
               {
                  name: 'removeEmptyAttrs',
                  active: false,
               },
               {
                  params: {
                     name: 'removeAttrs',
                     attrs: '(width|height)',
                  },
               },
            ],
         },
      }),
      favicon({
         source: paths.src.favIcon,
         output: paths.public.assets,
         generatorOptions: {
            path: './Fake-Store/assets',
            appName: 'Fake Store',
            appDescription: 'This online store is a training project created for educational purposes.',
            developerName: 'Binarion',
            developerURL: '', // prevent retrieving from the nearest package.json
            lang: 'en',
            theme_color: '#fff9c4',
            background: '#fff9c4',
            icons: {
               favicons: true,
               appleIcon: true,
               android: true,
               windows: false,
               yandex: false,
               appleStartup: false,
            },
         },
      }),
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
         '@tools/*': '/src/hooks',
         '@events/*': '/src/events',
         '@api/*': '/src/api',
      },
   },
   css: {
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
   build: {
      rollupOptions: {
         input: {
            main: './index.html',
         },
      },
   },
};
