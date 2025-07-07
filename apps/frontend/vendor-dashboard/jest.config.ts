import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	displayName: 'vendor-dashboard',
	preset: '../../../jest.preset.js',
	transform: {
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../../coverage/apps/frontend/vendor-dashboard',
	testEnvironment: 'jsdom',
};

export default createJestConfig(config);
