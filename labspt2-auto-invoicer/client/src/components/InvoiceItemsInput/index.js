import React from "react";

import "./InvoiceItemsInput.css";

const InvoiceItemsInput = props => {
  return props.invoiceItems.map((val, idx) => {
    let itemId = `item-${idx}`,
      quantityId = `quantity-${idx}`,
      rateId = `rate-${idx}`,
      amountId = `amount-${idx}`;
    return (
      <div key={idx} className="invoice-item-container">
        <div>
          <label htmlFor={itemId}>{`Item #${idx + 1}`}</label>
          <input
            type="text"
            name={itemId}
            data-id={idx}
            id={itemId}
            value={props.invoiceItems[idx].name}
            className="item"
            placeholder={"Item"}
          />
        </div>
        <div>
          <label htmlFor={quantityId}>{`Quantity #${idx + 1}`}</label>
          <input
            type="text"
            name={itemId}
            data-id={idx}
            id={itemId}
            value={props.invoiceItems[idx].name}
            className="quantity"
          />
        </div>
        <div>
          <label htmlFor={rateId}>{`Rate #${idx + 1}`}</label>
          <input
            type="text"
            name={itemId}
            data-id={idx}
            id={itemId}
            value={props.invoiceItems[idx].name}
            className="rate"
          />
        </div>
        <div>
          <label htmlFor={amountId}>{`Amount #${idx + 1}`}</label>
          <input
            type="text"
            name={itemId}
            data-id={idx}
            id={itemId}
            value={props.invoiceItems[idx].name}
            className="amount"
          />
        </div>
      </div>
    );
  });
};

export default InvoiceItemsInput;
