import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { Listing } from '../Listing';

afterEach(cleanup);

describe('<Listing />', () => {
    it('renders without any errors', () => {
        const props = {
            listing: {}
        }

        render(<Listing {...props} />)
    });

    it('redirects to calendar', () => {
        const props = {
            listing: {},
            history: []
        }

        const { getByTestId } = render(<Listing {...props} />)
        const listing = getByTestId('listing-card')

        fireEvent.click(listing);

        expect(props.history).toMatchObject([{ pathname: '/listing', state: {listing: props.listing} }])
    })
})