import React from 'react';
import { Checkout } from '../index';
import {
  cleanup,
  waitForElement,
  render,
  wait,
  act,
} from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';
import { UserContextProvider } from '../../UserContext';

afterEach(cleanup);
const props: any = {
  location: { search: 'code=34134123dsfasfdads' },
  history: {},
  match: {
    params: {
      id: 1,
    },
  },
};

const mockData = {
  guest_name: 'Harald Junke',
  house_id: 1,
  house_name: 'house name 1',
  house_address: '123 go duck yourself ave',
  default_ast: 4,
  guest_guide: null,
  ast_guide: null,
  price: '450.50',
  extra_fee: '30.00',
  cleaning_fee: '65.00',
  extra_guests: null,
  stay_id: 1,
  check_in: '2018-01-26T23:00:00.000Z',
  check_out: '2018-01-29T23:00:00.000Z',
  diff: 3,
};

// Mock of axios get request
jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: mockData,
      }),
    ),
  };
});

localStorage.setItem('token', 'testToken!');

// TODO: Figure out why this is broken.

describe('Checkout Page UI', () => {
  test('should be rendering the Container component', async () => {
    const { getByTestId } = render(
      <UserContextProvider>
        <Checkout {...props} />
      </UserContextProvider>,
    );
    const container = getByTestId('container-component');
    await wait(() => {
      expect(container).toBeTruthy();
    });
  });

  test.skip('should render a name from stay', async () => {
    const { getByTestId } = render(
      <UserContextProvider>
        <Checkout {...props} />
      </UserContextProvider>,
    );
    const header = await waitForElement(() => getByTestId('guest-name'));
    await wait(() => {
      expect(header).toHaveTextContent(mockData.guest_name);
    });
  });

  test.skip('should render a payment button, displaying "Pay $total amount"', async () => {
    const { getByText } = render(
      <UserContextProvider>
        <Checkout {...props} />
      </UserContextProvider>,
    );
    const { diff, price, cleaning_fee } = mockData;
    const total = diff * +price + +cleaning_fee;
    const payButton = await waitForElement(() => getByText(`Pay $${total}`));

    await wait(() => {
      expect(payButton).toHaveTextContent(`Pay $${total}`);
    });
  });

  test.skip('should display the correct total amount of the stay', async () => {
    const { getByText } = render(
      <UserContextProvider>
        <Checkout {...props} />
      </UserContextProvider>,
    );
    const { diff, price, cleaning_fee } = mockData;
    const total = diff * +price + +cleaning_fee;
    const totalDisplay = await waitForElement(() => getByText(`Pay $${total}`));
    await wait(() => {
      expect(totalDisplay).toHaveTextContent(`Pay $${total}`);
    });
  });

  test.skip('should not display the Extra Guest invoice box when there are 0 extra guests', async () => {
    const { queryByTestId } = render(
      <UserContextProvider>
        <Checkout {...props} />
      </UserContextProvider>,
    );
    await waitForElement(() => setTimeout(() => null, 2000));

    await wait(() => {
      expect(queryByTestId('extra-guests')).toBeNull();
    });
  });
});
