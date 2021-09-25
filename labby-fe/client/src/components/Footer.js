import React from "react";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  
  footer: {
    width: '100hv',
    background: '#222E44',
    color: 'white',
    paddingTop: '10px',
    paddingBottom: '0px',
    bottom: '0',
  },
});

const Footer = props => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div>Labby 2019</div>
    </footer>
  );
};

export default Footer;
