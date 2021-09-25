import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#8bc34a",
      dark: "#689f38",
      contrastText: "#000"
    },
    secondary: {
      main: "#212121"
    }
  },
  typography: {
    h1: {
      fontSize: 90,
      fontWeight: 500
    },
    h2: {
      fontSize: 50
    },
    h3: {
      fontSize: 30
    },
    h4: {
      fontSize: 20
    },
    h5: {
      fontSize: 16
    },
    h6: {},
    body1: {
      fontSize: 14,
      overflowWrap: "break-word"
    },
    body2: {},
    button: {
      fontSize: 16,
      color: "white"
    },
    caption: {
      fontSize: 12,
      color: "black"
    },
    overline: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white"
    }
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "black",
        fontSize: 13
      }
    },
    MuiSelect: {
      root: {
        color: "black",
        fontSize: 13
      }
    },
    MuiFormHelperText: {
      root: {
        color: "black",
        fontSize: 13
      }
    },
    MuiListItem: {
      root: {
        color: "black",
        fontSize: 13
      }
    },
    MuiMenuItem: {
      root: {
        color: "black",
        fontSize: 13
      }
    },
    // MuiDialogContentText: {
    //   root: {
    //     color: "black",
    //     fontSize: 13
    //   }
    // },
    MuiDialogTitle: {
      root: {
        color: "black",
        fontSize: 18
      }
    },
        MuiInputBase: {
      root: {
        color: "black",
        fontSize: 13
      }
    }
  }
});
