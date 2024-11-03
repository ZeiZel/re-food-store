import baseConfig from './eslint.config.base.mjs';

export default [
	...baseConfig,
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
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {},
	},
	{
		files: ['**/*.js', '**/*.jsx'],
		rules: {},
	},
];
