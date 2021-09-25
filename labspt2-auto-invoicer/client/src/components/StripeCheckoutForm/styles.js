export default theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%",
    fontSize: "1.5rem"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: "90%",
    fontSize: "1.5rem"
  },
  card: {
    width: "90%",
    marginTop: 15
  },
  button: {
    margin: theme.spacing.unit,
    width: "90%",
    alignSelf: "center",
    height: 40,
    marginTop: 20,
    fontSize: 18,
    color: "#ffffff",
    backgroundColor: "#8bc34a",
    "&:hover": {
      backgroundColor: "#2d2f31"
    }
  },
  label: {
    fontSize: "1.5rem"
  },
  helperText: {
    fontSize: "1.2rem"
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  }
});
