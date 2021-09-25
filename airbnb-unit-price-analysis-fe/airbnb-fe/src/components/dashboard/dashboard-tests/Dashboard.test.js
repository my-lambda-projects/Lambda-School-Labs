import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Dashboard } from '../Dashboard';

afterEach(cleanup);

describe('<Dashboard />', () => {
    it('renders without errors', () => {
        const props = {
            isFetching: false,
            listings: [],
            error: null
        }

        render(<Dashboard {...props} />)
    });
});