import { render } from '@testing-library/react';

import ReUi from './re-ui';

describe('ReUi', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ReUi />);
		expect(baseElement).toBeTruthy();
	});
});
