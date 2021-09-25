import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div>
        <Typography variant="caption" align="center">
          about the{' '}
          <Button size="small" component={Link} to="/about">
            team
          </Button>
        </Typography>
      </div>
    );
  }
}

export default Footer;
