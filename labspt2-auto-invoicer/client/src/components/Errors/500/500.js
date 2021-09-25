import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Animate from '../Animate';
import styles from '../styles';

const Error500Page = ({
  classes,
  history,
  match: {
    params: { id }
  }
}) => {
  const [timer, setTimer] = useState(15);
  const time = timer > 1 ? 'seconds' : 'second';

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      history.push(`/user/${id}/dashboard`);
    }
  }, [timer]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Animate animation="transition.expandIn" delay={100}>
          <Typography
            variant="h1"
            color="inherit"
            className="font-medium mb-16"
          >
            500
          </Typography>
        </Animate>

        <Animate delay={500}>
          <Typography
            variant="h5"
            color="textSecondary"
            className={classes.h5Message}
          >
            Well, you broke the internet!
          </Typography>
        </Animate>

        <Animate delay={600}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.subtitleMessage}
          >
            Just kidding, looks like we have an internal issue, please try again
            in a few minutes.
          </Typography>
        </Animate>
        <Typography className={classes.timer} variant="subtitle2">
          You'll be redirected to your Dashboard in{' '}
          <span className={classes.span}>
            {timer} {time}
          </span>
          . Or
        </Typography>
        <Typography
          variant="h6"
          onClick={() => history.push(`/user/${id}/dashboard`)}
          className={classes.link}
        >
          Go back to Dashboard now!
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(Error500Page);
