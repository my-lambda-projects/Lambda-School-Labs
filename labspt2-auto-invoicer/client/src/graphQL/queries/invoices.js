import {Post} from "../index";

// fetch all invoices
export const FetchInvoices = async returnedData => {
  const Invoices = {
    query: `
            query {
                invoices {
                    ${returnedData}
                }
            }
        `
  };
  const listOfInvoices = await Post(Invoices);
  return listOfInvoices.data.data;
};

// fetch single invoice
export const FetchInvoice = async (invoiceID, returnedData) => {
  const Invoice = {
    query: `
            query {
                invoice(invoiceID: "${invoiceID}") {
                    ${returnedData}
                }
            }
        `
  };
  const returnedInvoice = await Post(Invoice);
  return returnedInvoice.data.data;
};
