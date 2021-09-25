import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { DatePicker } from "material-ui-pickers";
import NoMarkersModalWrapped from "./TripSaveModal";

const styles = () => ({
  button: {
    marginLeft: "6%",
    marginRight: "5%",
    textAlign: "center"
  }
});
const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
class TripCreateForm extends React.Component {
  componentDidMount() {
    const { tripsfromUserName } = this.props;
    ValidatorForm.addValidationRule("tripExists", value => {
      if (tripsfromUserName.length === 0) {
        return true;
      }
      function doesAnyMatch(currentValue) {
        return value.toLowerCase() !== currentValue.toLowerCase();
      }
      if (tripsfromUserName.every(doesAnyMatch)) {
        return true;
      }
      return false;
    });
  }

  render() {
    const {
      tripName,
      handleChange,
      handleDateChange,
      startDate,
      isEnabled,
      noMarkersModalFalseF,
      noMarkersModalOpenF,
      tripSaveModal,
      modalFade,
      handleSubmit,
      fireRedirect,
      endDate,
      email
    } = this.props;
    return (
      <React.Fragment>
        <ValidatorForm autoComplete="off" onSubmit={noMarkersModalOpenF}>
          <div>
            <Paper className="tripCreateForm">
              <MuiThemeProvider theme={theme}>
                <TextValidator
                  autoComplete="off"
                  className="textVal"
                  validators={["tripExists"]}
                  id="tripName"
                  name="tripName"
                  label="Trip Name"
                  type="text"
                  errorMessages={["trip name already exists"]}
                  value={tripName}
                  onChange={handleChange("tripName")}
                />
                <div className="picker">
                  <DatePicker
                    label="Start Date"
                    disablePast
                    showTodayButton
                    value={startDate}
                    onChange={handleDateChange("startDate")}
                    animateYearScrolling
                  />
                </div>
                <div className="picker">
                  <DatePicker
                    initialFocusedDate={startDate}
                    label="End Date"
                    disablePast
                    showTodayButton
                    minDate={startDate}
                    minDateMessage="Date must be geater than trip start date"
                    value={endDate}
                    onChange={handleDateChange("endDate")}
                    animateYearScrolling
                  />
                </div>
                <Button
                  id="saveTripButton"
                  variant="outlined"
                  type="submit"
                  color="primary"
                  size="large"
                  disabled={!isEnabled}
                >
                  Save Trip
                  <Icon>send</Icon>
                </Button>
              </MuiThemeProvider>
            </Paper>
            <NoMarkersModalWrapped
              noMarkersModalFalseF={noMarkersModalFalseF}
              noMarkersModalOpenF={noMarkersModalOpenF}
              tripSaveModal={tripSaveModal}
              modalFade={modalFade}
              handleSubmit={handleSubmit}
            />
          </div>
        </ValidatorForm>
        {fireRedirect && <Redirect to={`/${email}`} />}
      </React.Fragment>
    );
  }
}

TripCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  noMarkersModalOpenF: PropTypes.func.isRequired,
  noMarkersModalFalseF: PropTypes.func.isRequired,
  modalFade: PropTypes.bool.isRequired,
  tripSaveModal: PropTypes.bool.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  fireRedirect: PropTypes.bool.isRequired,
  tripName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  tripsfromUserName: PropTypes.instanceOf(Array).isRequired,
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object)
  ]).isRequired,
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)])
    .isRequired
};

export default withStyles(styles)(TripCreateForm);
