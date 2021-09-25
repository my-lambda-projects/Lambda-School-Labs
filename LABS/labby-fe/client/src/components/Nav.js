import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  header: {
    color: 'white',
    height: '236px',
    background: '#222E44',
    textDecoration: 'none',
  },
  button: {
    margin: '40px',
    background: '#33B2DD',
    textDecoration: 'none',
    color: 'white',
    
  }
});

const Nav = props => {


  const classes = useStyles();

  return (
    <header className={classes.header}>
      <h1>Welcome to Labby!</h1>
      <nav>
        <Link to="/">
          <Button variant="contained" className={classes.button}>Home</Button>
        </Link>
        <Link to="/learn">
          <Button variant="contained" className={classes.button}>Learn</Button>
        </Link>
        <Link to="/team">
          <Button variant="contained" className={classes.button}>Team</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Nav;
