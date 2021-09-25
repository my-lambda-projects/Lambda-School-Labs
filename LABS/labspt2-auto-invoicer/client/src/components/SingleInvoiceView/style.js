
export default theme => ({
  paper: {
    width: "95%",
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    margin: "20px auto",
    border: "1px solid #eff7f2"
  },
  appbar: {
    backgroundColor: "#ffffff",
    color:"#2d2f31",
    position: "static"
  },
  table: {
    minWidth: 1000,
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      minWidth: 0,
    }
  },
  tablecell: {
    fontSize: 30,
    align: "center"
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
    fontSize: 23,
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: 30
    }
  },
  headerTitle: {
    fontSize: 30,
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: 35
    }
  }
});
