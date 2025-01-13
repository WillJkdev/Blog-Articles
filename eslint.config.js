import eslintPluginAstro from 'eslint-plugin-astro';
import markdown from 'eslint-plugin-markdown';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import typescriptParser from '@typescript-eslint/parser';
import astroEslintParser from 'astro-eslint-parser';

export default [
  // Ignorar archivos y directorios
  {
    ignores: [
      'node_modules', // Ignora la carpeta node_modules
      'dist', // Ignora la carpeta dist
      '*.min.js', // Ignora archivos .min.js
    ],
  },
  // Configuración para TypeScript y Astro
  {
    files: ['*.ts', '*.astro'],
    languageOptions: {
      parser: {
        '.astro': astroEslintParser,
        '.ts': typescriptParser,
      },
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: eslintPluginImport,
      astro: eslintPluginAstro,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.astro'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'astro/no-set-html-directive': 'error',
      'astro/valid-html': 'error',
      'astro/no-unused-components': 'warn',
      'astro/no-deprecated-astro-api': 'warn',
      'astro/valid-astro-syntax': 'error',
      'import/no-unused-modules': [
        'error',
        {
          unusedExports: true,
          missingExports: false,
        },
      ],
    },
  },
  // Configuración para Markdown
  ...markdown.configs.recommended,
];
