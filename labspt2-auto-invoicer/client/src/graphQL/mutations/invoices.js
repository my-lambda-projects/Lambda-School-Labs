import { Post, inputToString } from "../index";

export const CreateInvoice = async (invoiceInput, returnedData) => {
  const result = inputToString(invoiceInput);
  console.log("invoice input:", result);
  const CreateInvoice = {
    query: `
            mutation {
                createInvoice(invoiceInput: {${result}}) {
                    ${returnedData}
                }
            }
        `
  };
  console.log("create invoice", CreateInvoice);
  const newInvoice = await Post(CreateInvoice);
  console.log("new invoice", newInvoice);
  return newInvoice.data.data;
};

export const EditInvoice = async (invoiceID, editedData, returnedData) => {
  editedData = inputToString(editedData);

  const EditInvoice = {
    query: `
            mutation {
                editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {${editedData}}) {
                    ${returnedData}
                }
            }
        `
  };
  const editedInvoice = await Post(EditInvoice);
  return editedInvoice.data.data;
};

export const EditAmountPaid = async (invoiceID, amountPaid, returnedData) => {
  // const amount = amountPaid.toString();
  const EditAmountPaid = {
    query: `
                mutation {
                    editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {amountPaid: "${amountPaid}"}) {
                        ${returnedData}
                    }
                }
            `
  };
  const editedAmount = await Post(EditAmountPaid);
  return editedAmount.data.data;
};

// EditTotal & EditBalanceDue
export const EditTotal = async (invoiceID, total, returnedData) => {
  // const amount = amountPaid.toString();
  const EditTotal = {
    query: `
                  mutation {
                      editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {total: "${total}"}) {
                          ${returnedData}
                      }
                  }
              `
  };
  const editedTotal = await Post(EditTotal);
  return editedTotal.data.data;
};

export const EditBalanceDue = async (invoiceID, balanceDue, returnedData) => {
  // const amount = amountPaid.toString();
  const EditBalanceDue = {
    query: `
                      mutation {
                          editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {balanceDue: "${balanceDue}"}) {
                              ${returnedData}
                          }
                      }
                  `
  };
  const editedBalanceDue = await Post(EditBalanceDue);
  return editedBalanceDue.data.data;
};

// AddInvoiceToUser or AddInvoiceToCompany?
export const AddInvoiceToCompany = async (
  invoiceID,
  companyID,
  returnedData
) => {
  const AddInvoiceToCompany = {
    query: `
            mutation {
                addInvoiceToCompany(invoiceID: "${invoiceID}", companyID: "${companyID}") {
                    ${returnedData}
                }
            }
        `
  };
  const returnedInvoice = await Post(AddInvoiceToCompany);
  return returnedInvoice.data.data;
};
