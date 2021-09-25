import React, { useState, useEffect, useContext } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import styles from './styles';
import CardHolderName from './CardHolderName';
import UserContext from './../../context/UserContext';
import { BuyPremium } from '../../graphQL/mutations/users';

const StripeCheckoutForm = props => {
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => setChecked(true), 700);
  }, []);

  const onChange = e => {
    setName(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const { token } = await props.stripe.createToken({ name });
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/stripe/charge`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          stripeToken: token.id
        })
      }
    );
    if (response.ok) {
      await BuyPremium(user._id, 'name');
    }
  };

  const { classes } = props;
  return (
    <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
      <Paper elevation={4} className={classes.paper}>
        <form className={classes.container} noValidate autoComplete="off">
          <CardHolderName onChangeHandler={onChange} value={name} />
          <CardElement className={classes.card} />
          <Button
            onClick={onSubmit}
            variant="contained"
            className={classes.button}
          >
            Pay $6.00
          </Button>
        </form>
      </Paper>
    </Slide>
  );
};

export default injectStripe(withStyles(styles)(StripeCheckoutForm));
