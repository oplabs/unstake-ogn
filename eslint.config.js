import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
      import: pluginImport,
      'unused-imports': pluginUnusedImports,
      'simple-import-sort': pluginSimpleImportSort,
    },
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Prettier
      'prettier/prettier': 'warn',
      // Unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // Import sort
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^\\u0000'],
            ['^react(-dom(/client)?)?$'],
            ['^@?\\w'],
            ['^((?!\\u0000$)|/.*|$)'],
            ['^\\.'],
            ['^@?\\w.*\\u0000$'],
            ['^.*\\u0000$'],
            ['^\\..*\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      // Import
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      // React
      'react/react-in-jsx-scope': 'off',
      // Typescript
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      '**/.react-router/**/*',
      '**/.wrangler/**/*',
      '**/node_modules',
      '**/build',
      '**/*.generated.ts',
      'app/generated/*',
    ],
  },
]);
