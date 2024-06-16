import type {UserConfig} from '@commitlint/types';
import {RuleConfigSeverity} from '@commitlint/types';

const config: UserConfig = {
	extends: ['@commitlint/config-conventional'],

	parserPreset: 'conventional-changelog-atom',

	formatter: '@commitlint/format',

	rules: {
		'type-enum': [RuleConfigSeverity.Error, 'always', ['chore', 'feat', 'refactoring']],
	},

	ignores: [(commit) => commit === ''],

	defaultIgnores: true,

	helpUrl:
		'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',

	prompt: {
		messages: {},
		questions: {
			type: {
				description: 'please input type:',
			},
		},
	},
};

export default config;
