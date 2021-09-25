import React from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: "400px",
    height: "300px",
    padding: "1% 2% 2% 2%",
    textAlign: "center"
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});

const MakerSaveModal = props => {
  const { classes, noMarkerNameFalseF, markSaveModal, markSaveFade } = props;
  return (
    <Modal open={markSaveModal} onClose={noMarkerNameFalseF} disableAutoFocus>
      <Fade in={markSaveFade}>
        <Paper style={getModalStyle()} className={classes.paper} elevation={4}>
          <Typography variant="headline">
            Please make sure you have a name for your maker and that you&apos;ve
            placed a marker on the map.
            <br />
            <br /> Do you want to continue?
          </Typography>
          <div className="stayOrLeaveButtons">
            <Button onClick={noMarkerNameFalseF}>Stay</Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};

const MakerSaveModalWrapped = withStyles(styles)(MakerSaveModal);

MakerSaveModal.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  noMarkerNameFalseF: PropTypes.func.isRequired,
  markSaveModal: PropTypes.bool.isRequired,
  markSaveFade: PropTypes.bool.isRequired
};

export default MakerSaveModalWrapped;
