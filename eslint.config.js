import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
   globalIgnores(['dist']),
   {
      ignores: [
         'dist/**',
         'build/**',
         'node_modules/**',
         'build/**',
         '.vscode/**',
         'coverage/**',
         'config/**',
         'package-lock.json',
         'vite.config.ts',
         'vite.config.js',
         'vitest.config.ts',
         'yarn.lock',
         '*.lock',
         '*.log',
         '*.map',
         '*.tsbuildinfo',
         '*.js',
         '*.min.js',
         '*.scss',
         '*.css',
         '*.json',
         '/.github',
         '/.git',
      ],
   },
   {
      files: ['**/*.{ts,tsx}'],
      extends: [js.configs.recommended, tseslint.configs.recommended],
      languageOptions: {
         ecmaVersion: 2022,
         globals: {
            ...globals.browser,
            ...globals.es2022,
            ...globals.node,
         },
         parser: tseslint.parser,
         parserOptions: {
            erasableSyntaxOnly: false,
            ecmaFeatures: {
               jsx: true,
            },
            sourceType: 'module',
         },
      },
      plugins: {
         react: reactPlugin,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         'simple-import-sort': simpleImportSort,
         prettier: prettierPlugin,
      },
      rules: {
         'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
         'react-hooks/rules-of-hooks': 'error',
         'react-hooks/exhaustive-deps': 'warn',
         'max-lines-per-function': 'off',
         'prettier/prettier': 'warn',
         'prefer-const': ['error', { destructuring: 'any' }],
         'no-undef': 'off',
         '@typescript-eslint/no-unused-vars': [
            'error',
            {
               args: 'all',
               argsIgnorePattern: '^_',
               caughtErrors: 'all',
               caughtErrorsIgnorePattern: '^_',
               destructuredArrayIgnorePattern: '^_',
               varsIgnorePattern: '^_',
               ignoreRestSiblings: true,
            },
         ],
         'simple-import-sort/imports': [
            'warn',
            {
               groups: [
                  ['^react', '^next'],
                  ['^@?\\w'],
                  ['^@($|/)'],
                  ['^src/'],
                  ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                  ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                  ['^\\.css$', '^\\.scss$', '^.(jpe?g|png|svg|avif|webp|gif|bmp)$'],
               ],
            },
         ],
         'simple-import-sort/exports': 'warn',
      },
   },
]);
