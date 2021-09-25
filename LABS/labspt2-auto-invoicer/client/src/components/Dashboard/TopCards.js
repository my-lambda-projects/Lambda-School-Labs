import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

const TopCards = props => {
  const { checked, children, classes, timeout } = props;
  return (
    <Grow
      in={checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout } : {})}
    >
      <Paper className={classes.paper}>
        <div className={classes.topcards}>{children}</div>
      </Paper>
    </Grow>
  );
};

export default withStyles(styles)(TopCards);
