import React from 'react';
import { Icon, Input, Paper, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Animate from '../Animate';
import styles from '../styles';

const Error404Page = ({
  classes,
  history,
  match: {
    params: { id }
  }
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Animate animation="transition.expandIn" delay={100}>
          <Typography variant="h1" color="inherit" className={classes.h1Error}>
            404
          </Typography>
        </Animate>

        <Animate delay={500}>
          <Typography
            variant="h5"
            color="textSecondary"
            className={classes.h5Message}
          >
            Sorry but we could not find the page you are looking for
          </Typography>
        </Animate>

        <Paper className={classes.searchPaper} elevation={1}>
          <Icon color="action">search</Icon>
          <Input
            placeholder="Search for anything"
            className={classes.searchInput}
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search'
            }}
          />
        </Paper>

        <Typography
          variant="h6"
          onClick={() => history.push(`/user/${id}/dashboard`)}
          className={classes.link}
        >
          Go back to Dashboard
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(Error404Page);
