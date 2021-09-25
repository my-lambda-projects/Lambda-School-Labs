export default theme => ({
  mainNavContainer: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`
  },

  appBar: {
    backgroundColor: `white`,
    width: `100%`,
    alignItems: `center`
  },

  accountBarContainer: {
    backgroundColor: `#8bc34a`,
    width: `100%`,
    height: `100%`,
    padding: `0 2.5%`,
    display: `flex`,
    justifyContent: `space-between`
  },

  navLinksContainer: {
    backgroundColor: `#2d2f31`,
    width: `100%`,
    padding: `0 2.5%`,
    display: `flex`,
    justifyContent: `space-around`,
    alignItems: `stretch`
  },

  icon: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
  },
  iconText: {
    fontWeight: `bold`,

    [theme.breakpoints.up("md")]: {
      fontSize: `2rem`
    }
  },

  accountMenu: {
    display: `flex`,
    justifyContent: `flex-end`,
    color: `#ffffff`
  },

  selectCompany: {
    width: `50%`,
    color: `#ffffff`,
    margin: `0 20px`,
    fontWeight: `bold`,
    textTransform: `capitalize`
  },

  rightContainer: {
    width: `20%`,
    height: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `flex-end`,

    [theme.breakpoints.up("md")]: {
      width: `35%`
      // width: `10%`
    }
  },

  navLinksRight: {
    display: `flex`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    height: `50px`,
    width: `100%`

    // [theme.breakpoints.up('sm')]: {
    //   // width: `35%`
    //   width: `70%`
    // },

    // [theme.breakpoints.up('md')]: {
    //   // width: `35%`
    //   width: `20%`
    // },
  },

  link: {
    borderRadius: `6%`,
    width: `100px`,
    textAlign: `center`,

    // [theme.breakpoints.up('sm')]: {
    //   width: `30px`
    // },

    // [theme.breakpoints.up('md')]: {
    //   width: `100px`
    // },

    "&:hover": {
      cursor: `pointer`,
      backgroundColor: `#2d2f31`,
      color: `white`
    }
  },

  navLink: {
    color: `#ffffff`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    width: `10%`,
    fontWeight: `bold`,

    "&:hover": {
      borderBottom: `solid #8bc34a 5px`
    },

    [theme.breakpoints.down("sm")]: {
      width: `20%`
    }
  },

  active: {
    borderBottom: `solid #8bc34a 5px`
  }
});
