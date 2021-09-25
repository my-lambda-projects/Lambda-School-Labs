import React from "react";
//import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
    marginTop: 10,
    height: 50,
    width: 75
  }
});

const UploadLogo = props => {
  const { classes } = props;
  return (
    <div>
      <input
        accept="image/*"
        //className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        {/* <Button variant="raised" component="span" className={classes.button}> */}
        <Button
          variant="contained"
          component="span"
          color="default"
          className={classes.button}
        >
          Upload Logo
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </label>
    </div>
  );
};

export default withStyles(styles)(UploadLogo);
