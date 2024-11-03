import path from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import nxEslintPlugin from '@nx/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import globals from "globals";
import {fileURLToPath} from 'url';
import { config as _config, parser as _parser, plugin } from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default _config(
	eslintConfigPrettier,
	{ plugins: { '@nx': nxEslintPlugin } },
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: [],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
					],
				},
			],
		},
	},
	...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
		...config,
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			...config.rules,
		},
	})),
	...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
		...config,
		files: ['**/*.js', '**/*.jsx'],
		rules: {
			...config.rules,
		},
	})),
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		extends: [],
		languageOptions: {
			parser: _parser,
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
		plugins: {
			import: eslintPluginImport,
			/*unicorn: eslintPluginUnicorn,
			'unused-imports': eslintPluginUnusedImports,*/
			'@typescript-eslint': plugin,
		},
		rules: {
			'no-undef': 'off',
			'no-restricted-imports': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-restricted-imports': 'error',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			/* нужно отлавливать круговые зависимости */
			'import/no-cycle': 'error',
			'import/no-unresolved': 'off',
			/*
			 * проверяет максимальную длину строки
			 * если комментарий, то игнорирует
			 *  */
			'max-len': ['error', { code: 120, ignoreComments: true }],
			/* нельзя использовать объявленные ранее имена (даже внутри другого скоупа) */
			'no-shadow': 'warn',
			/* неиспользуемые переменные запрещены */
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'no-underscore-dangle': 'off',
		},
	},
);
