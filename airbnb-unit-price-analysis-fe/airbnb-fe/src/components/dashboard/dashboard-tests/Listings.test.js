import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Listings from '../Listings';

afterEach(cleanup);

describe('<Listings />', () => {
    it('renders without any errors', () => {
        const props = {
            isFetching: false,
            listings: [],
            error: null
        }

        render(<Listings {...props} />)
    })
})