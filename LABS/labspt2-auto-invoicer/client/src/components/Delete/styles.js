export default theme => ({
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
  tooltip: {
    backgroundColor: "#ffffff",
    color: "#8bc34a",
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: "bold",
    border: "1px solid #8bc34a"
  },
  dialogTitle: {
    textAlign: "center"
  },
  dialogText: {
    fontSize: 20,
    textAlign: "center",
    color: "black"
  },
  dialog: {
    background: "#eff7f2"
  },
  buttons: {
    width: 100,
    [theme.breakpoints.up("sm")]: {
      width: 130
    }
  }
});
