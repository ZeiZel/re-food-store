import css from '@eslint/css';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-ignore
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
// import reactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default tseslint.config(
	eslintConfigPrettier,
	{ plugins: { '@nx': nxEslintPlugin } },
	// reactCompiler?.configs?.recommended,
	/*{
    files: ['**!/!*.ts', '**!/!*.tsx', '**!/!*.js', '**!/!*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'warn',
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
  },*/
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
		files: ['**/*.{css,scss,sass}'],
		plugins: {
			css,
		},
		language: 'css/css',
		rules: {
			'css/no-duplicate-imports': 'error',
			'css/require-baseline': [
				'warn',
				{
					available: 'widely',
				},
			],
		},
	},
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		extends: [],
		languageOptions: {
			parser: tseslint.parser,
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
		plugins: {
			prettier: eslintPluginPrettier,
			import: eslintPluginImport,
			unicorn: eslintPluginUnicorn,
			// 'unused-imports': eslintPluginUnusedImports,
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			// 'react-compiler/react-compiler': 'error',
			'no-undef': 'off',
			'no-restricted-imports': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-empty-function': 'warn',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-restricted-imports': 'error',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'prettier/prettier': ['error'],
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			/*
			 * проверяет максимальную длину строки
			 * если комментарий, то игнорирует
			 *  */
			'max-len': ['error', { code: 120, ignoreComments: true }],
			/* нельзя использовать объявленные ранее имена (даже внутри другого скоупа) */
			'no-shadow': 'warn',
			/* неиспользуемые переменные запрещены */
			'no-unused-vars': 'off',
			'no-underscore-dangle': 'off',
			// 'react-compiler/react-compiler': 'error',
			/** UNICORN */
			'unicorn/better-regex': 'error',
			'unicorn/empty-brace-spaces': 'error',
			'unicorn/escape-case': 'error',
			'unicorn/explicit-length-check': 'error',
			/** IMPORT */
			'import/no-dynamic-require': 'warn',
			'import/no-nodejs-modules': 'warn',
			'import/no-cycle': 'error' /* нужно отлавливать круговые зависимости */,
			'import/no-unresolved': 'off',
			'import/named': 'error',
			'import/no-amd': 'error',
			'import/no-commonjs': 'warn',
			'import/namespace': 'error',
			'import/default': 'error',
			'import/export': 'error',
		},
	},
);
