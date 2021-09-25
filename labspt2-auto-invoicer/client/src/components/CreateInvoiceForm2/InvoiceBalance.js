import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const InvoiceBalance = props => {
  return props.invoiceBalanceItems.map((val, idx) => {
    let subtotalId = `subtotal-${idx}`,
      discountId = `discount-${idx}`,
      taxId = `tax-${idx}`,
      shippingId = `shipping-${idx}`,
      totalId = `total-${idx}`,
      amountPaidId = `amountPaid-${idx}`;

    return (
      <React.Fragment key={idx}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={subtotalId}
              data-id={idx}
              id={subtotalId}
              value={props.invoiceBalanceItems[idx].name}
              className="subtotal"
              label="Subtotal"
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name={discountId}
              data-id={idx}
              id={discountId}
              value={props.invoiceBalanceItems[idx].name}
              className="discount"
              label="Discount"
              fullWidth
              autoComplete="billing address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={taxId}
              data-id={idx}
              id={taxId}
              value={props.invoiceBalanceItems[idx].name}
              className="tax"
              label="Tax"
              fullWidth
              autoComplete="billing address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name={shippingId}
              data-id={idx}
              id={shippingId}
              value={props.invoiceBalanceItems[idx].name}
              className="shipping"
              label="Shipping"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={totalId}
              data-id={idx}
              id={totalId}
              value={props.invoiceBalanceItems[idx].name}
              className="total"
              label="Total"
              fullWidth
              autoComplete="billing postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name={amountPaidId}
              data-id={idx}
              id={amountPaidId}
              value={props.invoiceBalanceItems[idx].name}
              className="amountPaid"
              label="Amount Paid"
              fullWidth
              autoComplete="billing country"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });
};

export default InvoiceBalance;

{
  /* <form
                  onSubmit={this.handleFormSubmit}
                  onChange={this.handleInvoiceBalanceItemsChange}
                >
                  <InvoiceBalance
                    invoiceBalanceItems={this.state.invoiceBalanceItems}
                  />
                </form> */
}
