import React from "react";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

const BuyNow = () => (
  <MuiThemeProvider theme={theme}>
    <Button variant="contained" color="primary" className="buttonThing">
      Buy Now
    </Button>
  </MuiThemeProvider>
);

export default BuyNow;
