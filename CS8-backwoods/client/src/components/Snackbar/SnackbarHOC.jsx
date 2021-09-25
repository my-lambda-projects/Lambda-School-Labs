import React from "react";

function WithSnackbar(Component) {
  return class extends React.Component {
    state = {
      snackbarOpen: false,
      snackbarMessage: "",
      snackbarVariant: "success"
    };

    handleSnackbarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({
        snackbarOpen: false
      });
    };

    handleSnackbarOpen = (variant, message) => {
      this.setState({
        snackbarVariant: variant,
        snackbarMessage: message,
        snackbarOpen: true
      });
    };

    render() {
      return (
        <Component
          handleSnackbarOpen={this.handleSnackbarOpen}
          handleSnackbarClose={this.handleSnackbarClose}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
}

export default WithSnackbar;
