import playwright from 'eslint-plugin-playwright';

import baseConfig from '../../../eslint.base.config.ts';

export default [
	playwright.configs['flat/recommended'],
	...baseConfig,
	{
		files: ['**/*.ts', '**/*.js'],
		// Override or add rules here
		rules: {},
	},
];
