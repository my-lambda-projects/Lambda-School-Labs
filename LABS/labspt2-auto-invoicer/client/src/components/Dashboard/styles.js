export default theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    overflow: "hidden",
    paddingBottom: 200,
    backgroundColor: "#f2f2f2"
  },
  grid: {
    width: "95%",
    margin: `0 ${theme.spacing.unit * 1}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    width: '100%',
    backgroundColor: "#ffffff",
    padding: theme.spacing.unit * 3,
    textAlign: "left",
    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    }
  },
  statistics: {
    height: 300
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing.unit
  },
  block: {
    padding: theme.spacing.unit * 2,
    paddingLeft: 0
  },
  topCards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  invoicesCircle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#2d2f31",
    "&:hover": {
      backgroundColor: "#8bc34a"
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  usersCircle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
     backgroundColor: "#2d2f31",
    "&:hover": {
      backgroundColor: "#8bc34a"
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  middleInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign:"center",
    width: "35%"
  },
  span: {
    fontWeight: "bolder",
    fontSize: "2rem",
    marginBottom: 25,
    color: "black"
  },
  percentageComparison: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "30%"
  },
  percentagePos: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#8bc34a",
    marginTop: 5
  },
  percentageNeg: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#FF0000",
    marginTop: 5
  },
  shortcuts: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shortcutsCircle: {
    fontSize: 30,
    width: 65,
    height: 65,
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
  }
});
