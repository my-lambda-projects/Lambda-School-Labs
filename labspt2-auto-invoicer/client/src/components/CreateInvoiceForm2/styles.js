export default theme => ({
  container: {
    //main container
    // dislay: "flex",
    // flexDirection: "column"
    flexGrow: 1,
    backgroundColor: "#eff7f2",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    //date picker grid
    width: "60%"
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 3
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit
    //width: "20%",
    //fontSize: "1.5rem"
    // [theme.breakpoints.down("xs")]: {
    //   //equivalent to max-width: 600px
    //   backgroundColor: theme.palette.primary.main
    // }
  }
});
