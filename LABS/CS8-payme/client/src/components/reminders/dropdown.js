import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownExampleSearchSelectionTwo = props => (
  <Dropdown
    placeholder="Invoices"
    search
    selection
    options={props.invoices.map(invoice => {
      return (
        <div>
          <p onClick={() => props.getInvoice(invoice.number, invoice.phone.number)}>
            {invoice.clientName}
          </p>
        </div>
      );
    })}
  />
);

export default DropdownExampleSearchSelectionTwo;
