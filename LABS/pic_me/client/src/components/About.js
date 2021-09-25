import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import lambda from '../static/Lambda_Symbol.png';
import Elly from '../static/elly.jpeg';
import Julian from '../static/julian.jpeg';
import Sam from '../static/sam.jpeg';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    maxWidth: 340,
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  actions: {
    display: 'flex'
  }
});

class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography gutterBottom>
                Pic Me started as a Capstone Project at{' '}
                <a href="https://lambdaschool.com/">
                  <img src={lambda} alt="lambda logo" width="27" height="29" />{' '}
                  Lambda School
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              <Grid key={0} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Elly"
                        src={Elly}
                        className={classes.avartar}
                      />
                    }
                    title="Elly S. Han"
                  />
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      Elly is a software engineer with a psychology background. Having 8
                      years experience at Microsoft, startup, and mHealth.
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button
                      size="small"
                      href="https://www.linkedin.com/in/ellysalley/"
                      color="primary"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="small"
                      href="https://github.com/ellysalley"
                      color="primary"
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid key={1} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Julian"
                        src={Julian}
                        className={classes.avartar}
                      />
                    }
                    title="Julian J. Kohlman"
                  />
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      Julian is a persistent learner who enjoys solving problems from the
                      backend, to the frontend.
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button
                      size="small"
                      href="https://www.linkedin.com/in/julian-j-kohlman-563a758b/"
                      color="primary"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="small"
                      href="https://github.com/juliankohlman"
                      color="primary"
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid key={2} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar alt="Sam" src={Sam} className={classes.avartar} />
                    }
                    title="Samuel Cha"
                  />
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      Sam is a software engineer that dreams of making “life” apps with
                      rich websites and clean backends.
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button
                      size="small"
                      href="https://www.linkedin.com/in/chasoonjin/"
                      color="primary"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="small"
                      href="https://github.com/samscha"
                      color="primary"
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(About));
