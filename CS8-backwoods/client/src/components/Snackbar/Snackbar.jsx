import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/colors/green";
import SnackbarContent from "./SnackbarContent";

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const SnackbarContentWrapper = withStyles(styles)(SnackbarContent);

const MainSnackbar = props => {
  const {
    snackbarOpen,
    handleSnackbarClose,
    snackbarVariant,
    snackbarMessage
  } = props;
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
      >
        <SnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant={snackbarVariant}
          message={snackbarMessage}
        />
      </Snackbar>
    </>
  );
};

export default MainSnackbar;
