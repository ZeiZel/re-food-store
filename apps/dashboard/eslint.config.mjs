import path from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { fixupConfigRules } from '@eslint/compat';
import baseConfig from '../../eslint.config.mjs';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  /* ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')), */
  ...baseConfig,
  { ignores: ['.next/**/*'] },
];
