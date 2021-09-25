export default theme => ({
  settingsContainer : {
    width: `100%`,
    display: `flex`,
    padding: theme.spacing.unit * 2,
    flexDirection: `column`,
    justifyContent: `space-around`,
    alignItems: `center`,
  },

  cardContainer: {
    maxWidth: `650px`,
    width: `100%`,
    marginBottom: `30px`,
  },

  cardHeader: {
    margin: `15px 20px`,
    borderBottom: `1px solid gray`,
    display: `flex`,
    justifyContent: `space-around`,
  },

  cards : {
    textAlign: 'start',
    color: theme.palette.text.secondary,
    width: '100%',
    height: `100%`,
    
    borderRadius: 0,
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`
  },

  infoContainer: {

  },

  info: {
    padding: `10px 20px`,
    display: `flex`,

    [theme.breakpoints.down("xs")]: {
      flexDirection: `column`,
    },

    "&:hover": {
      backgroundColor: `#F9FBE7`
    },
  },

  infoTitle: {
    width: `30%`,
    display: `flex`,
    [theme.breakpoints.down("xs")]: {
      width: `100%`
    }
  },

  infoData: {
    width: `70%`,
    display: `flex`,
    justifyContent: `flex-start`,
    textTransform: `capitalize`,

    [theme.breakpoints.down("xs")]: {
      width: `100%`
    }
  },

  infoDataEmail: {
    width: `70%`,
    display: `flex`,
    justifyContent: `flex-start`,

    [theme.breakpoints.down("xs")]: {
      width: `100%`
    }
  },

  edit : {
    marginLeft: `20px`,
    padding: `5px 20px`,
    backgroundColor: `#8bc34a`,
    color: `black`,

    "&:hover": {
      backgroundColor: `#2d2f31`,
      color: `white`,
    }
  },

  cancel: {
    width: `100px`,
    marginTop: `10px`,
    marginRight: `10px`,
    padding: `5px 10px`,
    backgroundColor: `#8bc34a`,
    color: `black`,

    "&:hover": {
      backgroundColor: `#2d2f31`,
      color: `white`,
    }
  },

  save: {
    width: `100px`,
    marginTop: `10px`,
    padding: `5px 10px`,
    backgroundColor: `#8bc34a`,
    color: `black`,

    "&:hover": {
      backgroundColor: `#2d2f31`,
      color: `white`,
    }
  },

  editContainer: {
    width: `80%`,
    padding: `10px`,
  },

  text : {
    fontSize: `1.6rem`
  },

  labelText: {
    fontSize: `1.2rem`
  }

})