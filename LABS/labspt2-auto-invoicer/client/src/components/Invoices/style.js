import { fade } from "@material-ui/core/styles/colorManipulator";
export default theme => ({
  root: {
    width: "95%",
    margin: "20px auto",
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      margin: "0px",
      marginTop: theme.spacing.unit * 3
    }
  },
  rootbar: {
    width: "100%"
  },
  table: {
    minWidth: 1000,
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      minWidth: 0
    }
  },
  shortcutsCircle: {
    fontSize: "30px",
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "#8bc34a",
    "&:hover": {
      backgroundColor: "#2d2f31"
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    cursor: "pointer"
  },
  shortcuts: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableWrapper: {
    overflowX: "auto"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    fontSize: 26,
    marginRight: "7px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: 30
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "10px"
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      marginLeft: "10px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
      marginLeft: "60px"
    }
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#8bc34a",
    "&:hover": {
      backgroundColor: "#2d2f31"
    },

    [theme.breakpoints.up("md")]: {
      marginRight: 60
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: 72
    }
  },
  tooltip: {
    backgroundColor: "#ffffff",
    color: "#8bc34a",
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: "bold",
    border: "1px solid #8bc34a"
  },
  tooltipNumber: {
    backgroundColor: "#ffffff",
    color: "#8bc34a",
    boxShadow: theme.shadows[1],
    fontSize: 13,
    fontWeight: "bold",
    border: "1px solid #8bc34a"
  },
  searchIcon: {
    paddingLeft: 8,
    paddingRight: 2,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  inputRoot: {
    color: "black",
    width: "100%"
  },
  inputInput: {
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 30,
    transition: theme.transitions.create("width"),
    width: 0.5,
    "&:focus": {
      width: 110
    },
    [theme.breakpoints.up("sm")]: {
      width: 100,
      "&:focus": {
        width: 200
      }
    },
    [theme.breakpoints.up("md")]: {
      width: 300,
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10
    }
  },
  textField: {
    marginRight: "8px",
    width: 72,
    [theme.breakpoints.up("sm")]: {
      width: 100,
      margin: "15px"
    },
    [theme.breakpoints.up("md")]: {
      width: 200,
      marginRight: "55px"
    }
  },
  menu: {
    width: 72,
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      width: 100
    },
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  filterLabel:{
    fontSize:"1.3rem"
  }
});
