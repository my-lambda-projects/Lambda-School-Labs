export default theme => ({
  root: {
    width: "95%",
    margin: "20px auto",
    height:"1500",
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      margin: "0px",
      marginTop: theme.spacing.unit * 3
    },
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#8bc34a",
    "&:hover": {
      backgroundColor: "#2d2f31"
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  table: {
    minWidth: 1000,
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      minWidth: 0
    }
  },
  tableWrapper: {
    overflowX: "auto"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    fontSize: 30,
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: 45
    }
  }
});
