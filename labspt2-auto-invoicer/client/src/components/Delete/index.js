import React, { useState, useContext, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip
} from "@material-ui/core";
import styles from "./styles";
import "./Delete.css";

import UserContext from "../../context/UserContext";

const Delete = props => {
  const { invoice } = props;
  const { hideInvoice } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const hiddenToggle = () => {
    hideInvoice(invoice._id, { hidden: true });
  };

  const { classes } = props;

  return (
    <Fragment>
      <Tooltip
        title="Delete"
        classes={{
          tooltip: classes.tooltip
        }}
      >
        <div className={classes.shortcutsCircle} onClick={handleToggle}>
          <i
            className="material-icons"
            style={{
              color: "#ffffff",
              fontSize: 36
            }}
          >
            delete_forever
          </i>
        </div>
      </Tooltip>
      <Dialog open={open} onClose={handleToggle}>
        <DialogTitle>
          <p> Delete Invoice ? </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wish to delete ?
            <br />
            <span className="buttons">
              <Button
                onClick={hiddenToggle}
                className={classes.buttons}
                variant="contained"
                style={{
                  backgroundColor: "#4fc878"
                }}
              >
                Delete
              </Button>
              <Button
                onClick={handleToggle}
                className={classes.buttons}
                variant="contained"
                style={{ background: "#ff8080" }}
              >
                Cancel
              </Button>
            </span>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
export default withStyles(styles)(Delete);
