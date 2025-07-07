import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	displayName: 'customer-store',
	preset: '../../../jest.preset.js',
	transform: {
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../../coverage/apps/frontend/customer-store',
	testEnvironment: 'jsdom',
};

export default createJestConfig(config);
