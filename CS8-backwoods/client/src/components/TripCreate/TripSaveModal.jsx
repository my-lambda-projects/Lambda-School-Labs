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
    height: "250px",
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

const NoMarkersModal = props => {
  const {
    classes,
    tripSaveModal,
    noMarkersModalFalseF,
    modalFade,
    handleSubmit
  } = props;
  return (
    <Modal open={tripSaveModal} onClose={noMarkersModalFalseF} disableAutoFocus>
      <Fade in={modalFade}>
        <Paper style={getModalStyle()} className={classes.paper} elevation={4}>
          <Typography variant="headline">
            You&apos;re about to create a trip with no waypoints.
            <br />
            <br /> Do you want to continue?
          </Typography>
          <div className="stayOrLeaveButtons">
            <Button onClick={noMarkersModalFalseF}>Stay</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};

const NoMarkersModalWrapped = withStyles(styles)(NoMarkersModal);

NoMarkersModal.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  tripSaveModal: PropTypes.bool.isRequired,
  noMarkersModalFalseF: PropTypes.func.isRequired,
  modalFade: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default NoMarkersModalWrapped;
