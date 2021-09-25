import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UserContext from '../../context/UserContext';

import InvoiceCustomer from './InvoiceCustomer';
import InvoiceItems from './InvoiceItems';
import InvoiceDetails from './InvoiceDetails';
import DateSelecter from '../DateSelecter';
import InvoiceSummary from '../InvoiceSummary';

import './CreateInvoiceStepper.css';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '60%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const CreateInvoiceStepper = props => {
  const context = useContext(UserContext);

  const [invoiceState, setInvoiceState] = useState({
    createdBy: context.user._id,
    number: '',
    description: '',
    terms: '',
    date: null,
    dueDate: null,
    company: {
      _id: context.company._id,
      name: context.company.name,
      email: context.company.email,
      phoneNumber: context.company.phoneNumber,
      address1: context.company.address1,
      address2: context.company.address2,
      zipCode: context.company.zipCode,
      city: context.company.city,
      state: context.company.state
    },
    customer: {
      _id: '',
      name: '',
      email: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      zipCode: '',
      city: '',
      state: ''
    },
    items: [],
    subtotal: '',
    discount: '',
    tax: '',
    shipping: '',
    total: '',
    balance: '',
    notes: '',
    errorText: ''
  });

  const [stepState, setStepState] = useState(0);

  const handleBack = () => {
    setStepState(prevStep => prevStep - 1);
  };

  const handleNext = () => {
    setStepState(prevStep => prevStep + 1);
  };

  const handleCustomerSelect = customer => {
    setInvoiceState({ ...invoiceState, customer });
  };

  const handleItemSelect = items => {
    setInvoiceState({ ...invoiceState, items });
  };

  const handleDateSelect = date => {
    setInvoiceState({ ...invoiceState, date });
  };

  const handleDueDateSelect = dueDate => {
    setInvoiceState({ ...invoiceState, dueDate });
  };

  const handleInputChange = input => {
    setInvoiceState({ ...invoiceState, ...input });
  };

  const handleCreateInvoice = async () => {
    const items = JSON.stringify(invoiceState.items).replace(
      /"([^"]+)":/g,
      '$1:'
    );
    const query = {
      query: `
      mutation {
        createInvoice(invoiceInput: {
          createdBy: "${invoiceState.createdBy}",
          number: "${invoiceState.number}",
          description: "${invoiceState.description}",
          terms: "${invoiceState.terms}",
          date: "${invoiceState.date}",
          dueDate: "${invoiceState.dueDate}",
          company: {
            _id: "${invoiceState.company._id}",
            name: "${invoiceState.company.name}",
            email: "${invoiceState.company.email}",
            phoneNumber: "${invoiceState.company.phoneNumber}",
            address1: "${invoiceState.company.address1}",
            address2: "${invoiceState.company.address2}",
            zipCode: "${invoiceState.company.zipCode}",
            city: "${invoiceState.company.city}",
            state: "${invoiceState.company.state}"
          },
          customer: {
            _id: "${invoiceState.customer._id}",
            name: "${invoiceState.customer.name}",
            email: "${invoiceState.customer.email}",
            phoneNumber: "${invoiceState.customer.phoneNumber}",
            address1: "${invoiceState.customer.address1}",
            address2: "${invoiceState.customer.address2}",
            zipCode: "${invoiceState.customer.zipCode}",
            city: "${invoiceState.customer.city}",
            state: "${invoiceState.customer.state}"
          },
          items: ${items},
          subtotal: "${invoiceState.subtotal}",
          discount: "${invoiceState.discount}",
          tax: "${invoiceState.tax}",
          shipping: "${invoiceState.shipping}",
          total: "${invoiceState.total}",
          balance: "${invoiceState.balance}",
          notes: "${invoiceState.notes}"
        } ) {
          _id
        }
    }`
    };
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/graphql`, query);
    setStepState(prevStep => prevStep + 1);
    console.log("after submission");
    await context.updateData(context.company._id);
    props.history.push(`/user/${context.user._id}/invoices`);
  };

  const steps = [
    'Select your customer',
    'Select dates',
    'Select your items',
    'Fill out details'
  ];

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <InvoiceCustomer
            companyId={invoiceState.company._id}
            customer={invoiceState.customer}
            onCustomerSelect={handleCustomerSelect}
          />
        );
      case 1:
        return (
          <React.Fragment>
            <DateSelecter
              label="Issue Date"
              onChangeHandler={handleDateSelect}
              value={invoiceState.date}
            />

            <DateSelecter
              label="Due Date"
              onChangeHandler={handleDueDateSelect}
              value={invoiceState.dueDate}
            />
          </React.Fragment>
        );
      case 2:
        return (
          <InvoiceItems
            items={invoiceState.items}
            subtotal={invoiceState.subtotal}
            onItemSelect={handleItemSelect}
          />
        );
      case 3:
        return (
          <InvoiceDetails
            invoice={invoiceState}
            onInputChange={handleInputChange}
          />
        );
      default:
        return 'Error';
    }
  };

  // Update subtotal on item change
  useEffect(() => {
    if (invoiceState.items.length) {
      const subtotal = invoiceState.items.reduce(
        (total, item) => (total += Number(item.amount)),
        0
      );
      setInvoiceState({ ...invoiceState, subtotal });
    }
  }, [invoiceState.items]);

  // Update total and balance on subtotal, discount, tax or shipping change
  useEffect(() => {
    if (invoiceState.items.length) {
      const { subtotal, discount, tax, shipping } = invoiceState;
      const total =
        Number(subtotal) + Number(discount) + Number(tax) + Number(shipping);

      setInvoiceState({ ...invoiceState, total, balance: total });
    }
  }, [
    invoiceState.subtotal,
    invoiceState.discount,
    invoiceState.tax,
    invoiceState.shipping
  ]);

  // Console.log
  useEffect(() => {
    // remove
    console.log(invoiceState);
  }, [invoiceState]);

  const { classes } = props;

  return (
    <div className="create-invoice-container">
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={stepState} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {stepState === steps.length ? (
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Invoice #{invoiceState.number} was successfully created
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(stepState)}
                <div className={classes.buttons}>
                  {stepState !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  {stepState === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateInvoice}
                      className={classes.button}
                    >
                      Create Invoice
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
      <InvoiceSummary invoice={invoiceState} />
    </div>
  );
};

export default withStyles(styles)(CreateInvoiceStepper);
