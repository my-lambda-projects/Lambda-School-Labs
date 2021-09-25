import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import { TimePicker, DatePicker } from "material-ui-pickers";
import Icon from "@material-ui/core/Icon";
import green from "@material-ui/core/colors/green";
import MakerSaveModalWrapped from "./MakerSaveModal";

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});
const styles = {
  card: {
    minWidth: 275
  },
  button: {
    margin: theme.spacing.unit
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const WaypointCreateCard = props => {
  const {
    classes,
    displayMarkerCard,
    children,
    startDate,
    endDate,
    handleDateChange,
    eta,
    time,
    handleTimeChange,
    activateMap,
    lat,
    handleNewWaypoint,
    ...rest
  } = props;
  return (
    <React.Fragment>
      <Collapse in={displayMarkerCard}>
        <Card className={classes.card}>
          <CardContent>
            <MuiThemeProvider theme={theme}>
              {children}
              <div className="waypointControlsWrapper">
                <div className="waypointTextField">
                  <div className="datePicker">
                    <DatePicker
                      label="ETA"
                      showTodayButton
                      disablePast
                      initialFocusedDate={startDate}
                      minDate={startDate}
                      maxDate={endDate}
                      minDateMessage="ETA must be greater then trip start date"
                      maxDateMessage="ETA must be less than trip end date"
                      value={eta}
                      onChange={handleDateChange("eta")}
                      animateYearScrolling={false}
                      className="pickerCard"
                    />
                  </div>
                  <div className="timePicker">
                    <TimePicker
                      showTodayButton
                      todayLabel="now"
                      label="Time"
                      value={time}
                      onChange={handleTimeChange}
                      className="pickerCard"
                    />
                  </div>
                </div>
                <div className="waypointButtonContainer">
                  {lat === null ? (
                    <Button
                      className={classes.button}
                      variant="outlined"
                      color="primary"
                      onClick={activateMap}
                      size="large"
                    >
                      Place Marker
                      <Icon>send</Icon>
                    </Button>
                  ) : (
                    <Button
                      className={classes.button}
                      variant="outlined"
                      color="primary"
                      onClick={handleNewWaypoint}
                      size="large"
                    >
                      Save Location
                      <Icon>send</Icon>
                    </Button>
                  )}
                </div>
              </div>
            </MuiThemeProvider>
          </CardContent>
        </Card>
      </Collapse>
      <MakerSaveModalWrapped {...rest} />
    </React.Fragment>
  );
};

WaypointCreateCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  displayMarkerCard: PropTypes.bool.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  handleNewWaypoint: PropTypes.func.isRequired,
  activateMap: PropTypes.func.isRequired,
  lat: PropTypes.number
};
WaypointCreateCard.defaultProps = {
  lat: 2
};

export default withStyles(styles)(WaypointCreateCard);
