import React from 'react';
import { render, fireEvent } from '../utility/customRender';
import CreateOrg from '../views/CreateOrg';

describe('createOrg page', () => {
  it('properly renders', () => {
    const component = render(<CreateOrg />);
    expect(component.getByText(/Register/)).toBeInTheDocument();
  });

  it('allow inputs to change with user input', () => {
    const { getByTitle } = render(<CreateOrg />);
    const titles = [
      'organizationName',
      'organizationType',
      'missionStatement',
      'aboutUs',
      'city',
      'state',
      'email',
      'phone',
      'website',
    ];
    titles.forEach(title => {
        let regex = new RegExp(title)
        let input = getByTitle(regex)
        fireEvent.change(input, {target: {value: 'test'}})
        expect(input).toHaveValue('test')
    })
  });
});
