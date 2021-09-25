import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { ReactComponent as Investing } from "../../assets/undraw_investing_7u74.svg";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styles from "./style";

// import css here
import "./EmptyInvoices.css";

const EmptyInvoices = props => {
  const [buttonSize, setButtonSize] = useState("large");
  const buttonSizeFunc = () => {
    window.innerWidth > 500 ? setButtonSize("large") : setButtonSize("medium");
  };
  useEffect(() => {
    buttonSizeFunc();
  }, []);

  const { classes, userID } = props;
  return (
    <Grow in={true} {...{ timeout: 1300 }}>
      <Paper
        style={{
          height: "490px",
          marginBottom: "20px"
        }}
        className={classes.root}
      >
        <AppBar
          style={{ backgroundColor: "#ffffff", color: "#2d2f31" }}
          position="static"
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              //className={classes.title}
              variant="h3"
              color="inherit"
              noWrap
            >
              Invoices
            </Typography>
            <Link to={`/user/${userID}/invoice/create`}>
              <Button
                variant="contained"
                className={classes.button}
                size={buttonSize}
              >
                Create
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <div className="align">
          <Link to={`/user/${userID}/invoice/create`}>
            <p className="topText">
              Your Path To Financial Success Starts Here.
            </p>
            <Investing className="emptyInvoices" />
            <p className="btmText">Click Now To Create Your First Invoice.</p>
          </Link>
        </div>
      </Paper>
    </Grow>
  );
};

export default withStyles(styles)(EmptyInvoices);
