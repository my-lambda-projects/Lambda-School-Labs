import React, { useState, Fragment } from "react";
import  {withStyles} from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from "@material-ui/core";
import Form from "./Form";
import styles from './styles';

const EditDialog = props => {
  const { classes, invoice } = props;
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen(!open)
    };

  return (
    <Fragment>
      <Tooltip
        title="Add Payment"
        classes={{
          tooltip: classes.tooltip
        }}
      >
        <div
          onClick={handleToggle}
          className={classes.shortcutsCircle}
        >
          <i
            className="material-icons"
            style={{
              color: '#ffffff',
              fontSize: 36
            }}
          >
            edit
          </i>
        </div>
      </Tooltip>
      <Dialog open={open} onClose={handleToggle}>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add payment to your invoice here
          </DialogContentText>
          <Form 
            invoice={invoice}
            handleToggle={handleToggle} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(styles)(EditDialog);
