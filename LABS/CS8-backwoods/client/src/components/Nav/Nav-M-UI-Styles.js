const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
    // backgroundColor: '#659dbd'
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    marginTop: "-54px",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  ListItemText: {
    // textAlign: 'center'
  },
  ChevronIcon: {
    height: "4rem",
    width: "4rem"
  },
  IconButton: {
    height: "80px",
    width: "80px"
  },
  CoolStuff: {
    display: "flex",
    justifyContent: "space-between"
  }
});

export default styles;
