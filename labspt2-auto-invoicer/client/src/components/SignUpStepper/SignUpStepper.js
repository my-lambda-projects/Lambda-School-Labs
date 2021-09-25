import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ContactInfo from './ContactInfo';
import CreateCompany from './CreateCompany';
import CreateCustomer from './CreateCustomer';
import FinalStep from './FinalStep';
import styles from './styles';
import UserContext from '../../context/UserContext';
import { toSetupAccount } from '../../context/mutations';

const SignUpStepper = props => {
  const { user } = useContext(UserContext);
  const context = useContext(UserContext);

  const [ activeStep, setActiveStep ] = useState(0)
  const [ contactInfoState, setContactInfoState ] = useState({name: user.name, phoneNumber: ''})
  const [ createCompanyState, setCreateCompanyState ] = useState(
    {
      name: '',
      email: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      zipCode: '',
      city: '',
      state: ''
    }
    );
  const [ createCustomerState, setCreateCustomerState ] = useState(
    {
      name: '',
      email: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      zipCode: '',
      city: '',
      state: ''
    }
  );

  const steps = ['Contact Info', 'Create Company', 'Create Customer'];

  const onSubmit = async () => {
    if(activeStep === steps.length - 1) {
      await toSetupAccount(user._id, {...contactInfoState, newAccount: false}, createCompanyState, createCustomerState);
      await context.updateData();
    }
  }

  const settingCustomerState = state => {
    return setCreateCustomerState({...createCustomerState, ...state})
  }

  const settingContactState = state => {
    return setContactInfoState({...contactInfoState, ...state})
  }

  const settingCompanyState = state => {
    return setCreateCompanyState({...createCompanyState, ...state})
  } 

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <ContactInfo contactInfo={contactInfoState} setState={ settingContactState } />;
    case 1:
      return <CreateCompany companyState={createCompanyState} setState={settingCompanyState} />;
    case 2:
      return <CreateCustomer customerState={createCustomerState} setState={settingCustomerState} />;
    default:
      throw new Error('Unknown step');
  }
}

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1)
    onSubmit();
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep -1)
  };

    const { classes } = props;

    return (
      <>
        <CssBaseline />
        <Grid container spacing={24}>
        <Grid item xs={12}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              3 Easy Steps ...
            </Typography>
            <Typography component="h1" variant="h5" align="center">
              and you can start invoicing
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? ( <FinalStep id={user._id} history={props.history} />
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </>
              )}
            </>
          </Paper>
        </main>
        </Grid>
        </Grid>
        
      </>
    );
}

SignUpStepper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUpStepper);
