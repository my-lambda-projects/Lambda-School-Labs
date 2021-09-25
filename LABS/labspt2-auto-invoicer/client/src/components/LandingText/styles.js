export default theme => ({
  container: {
    paddingTop: 100,
    paddingBottom: 50,
    width: '100%',
    background: '#2d2f31'
  },
  root: {
    width: '100%',
    maxWidth: 700,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  },
  headlineText: {
    fontFamily: 'roboto',
    fontSize: 95,
    fontWeight: 500,
    color: 'white',

    [theme.breakpoints.down('md')]: {
      fontSize: 75
    }
  },
  subtext: {
    color: '#8bc34a'
  },
    mobileText: {
    paddingLeft: "5px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 0
    }
  }
});