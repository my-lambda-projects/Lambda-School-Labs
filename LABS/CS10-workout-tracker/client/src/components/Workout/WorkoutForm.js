import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  postNewRoutine,
  clearCurrentRoutine,
  postNewExerciseInRoutine
} from "../../actions";

class WorkoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      routineName: "",
      exerciseName: "",
      weight: "",
      sets: "",
      reps: "",
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRoutineSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (this.state.routineName.trim() === "") {
      newErrors.routineName = "Required Routine Name";
    }

    if (Object.keys(newErrors).length > 0) {
      return this.setState({ errors: newErrors });
    }

    this.props.postNewRoutine(this.state.routineName);

    this.setState({
      routineName: "",
      errors: {}
    });
  };

  handleExerciseSubmit = (e, rountineId) => {
    e.preventDefault();
    const { exerciseName, weight, sets, reps } = this.state;
    const newError = {};
    if (exerciseName.trim() === "") {
      newError.exerciseName = "Required Exercise Name";
    }

    if (weight <= 0 || weight > 1000) {
      newError.weight = "Weight must be between 1 and 1000";
    }

    if (weight === "") {
      newError.weight = "Required Weight";
    }

    if (sets <= 0 || sets > 1000) {
      newError.sets = "Sets must be between 1 and 1000";
    }

    if (sets === "") {
      newError.sets = "Required Sets";
    }

    if (reps <= 0 || reps > 1000) {
      newError.reps = "Reps must be between 1 and 1000";
    }

    if (reps === "") {
      newError.reps = "Required Reps";
    }

    if (Object.keys(newError).length > 0) {
      return this.setState({ errors: newError });
    }

    const exerciseData = {
      name: exerciseName,
      currentWeight: weight,
      currentSets: sets,
      currentReps: reps
    };

    if (this.props.focusRoutine) {
      this.props.postNewExerciseInRoutine(
        this.props.focusRoutine._id,
        exerciseData
      );
    }

    this.setState({
      exerciseName: "",
      weight: "",
      sets: "",
      reps: "",
      errors: {}
    });
  };

  handleCreateRoutineButton = () => {
    this.props.clearCurrentRoutine();
    this.setState({
      routineName: "",
      exerciseName: "",
      weight: "",
      sets: "",
      reps: "",
      errors: {}
    });
  };

  showRoutineForm = () => {
    return (
      <div className="routine__input__form">
        <h2>CREATE NEW ROUTINE</h2>
        <form onSubmit={this.handleRoutineSubmit}>
          <input
            value={this.state.routineName}
            name="routineName"
            autoComplete="off"
            placeholder="Routine Name"
            onChange={this.handleChange}
            maxLength="15"
          />
          {this.state.errors.routineName ? (
            <span className="form__validation">
              {this.state.errors.routineName}{" "}
            </span>
          ) : null}
          <br />
          <br />
          <button>Add Routine</button>
        </form>
      </div>
    );
  };

  showExerciseForm = () => {
    return (
      <div className="routine__input__form">
        <h2>CREATE NEW EXERCISE</h2>
        <button onClick={this.handleCreateRoutineButton}>
          Create a new routine
        </button>
        <form onSubmit={this.handleExerciseSubmit}>
          <input
            value={this.state.exerciseName}
            name="exerciseName"
            placeholder="Exercise Name"
            onChange={this.handleChange}
            autoComplete="off"
            maxLength="15"
          />
          {this.state.errors.exerciseName ? (
            <p className="form__validation">{this.state.errors.exerciseName}</p>
          ) : null}
          <input
            value={this.state.weight}
            name="weight"
            type="number"
            placeholder="Weight"
            autoComplete="off"
            maxLength="5"
            onChange={this.handleChange}
          />
          {this.state.errors.weight ? (
            <p className="form__validation">{this.state.errors.weight}</p>
          ) : null}
          <input
            value={this.state.sets}
            name="sets"
            type="number"
            placeholder="Sets"
            autoComplete="off"
            maxLength="5"
            onChange={this.handleChange}
          />
          {this.state.errors.sets ? (
            <p className="form__validation">{this.state.errors.sets}</p>
          ) : null}
          <input
            value={this.state.reps}
            name="reps"
            type="number"
            placeholder="Reps"
            autoComplete="off"
            maxLength="5"
            onChange={this.handleChange}
          />
          {this.state.errors.reps ? (
            <p className="form__validation">{this.state.errors.reps}</p>
          ) : null}
          <br />
          <br />
          <button>Add Exercise</button>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div className="workout__form">
        {this.props.focusRoutine
          ? this.showExerciseForm()
          : this.showRoutineForm()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    focusRoutine: state.RoutineManager.focusedRoutine
  };
};

WorkoutForm.propTypes = {
  focusRoutine: PropTypes.object,
  postNewRoutine: PropTypes.func,
  clearCurrentRoutine: PropTypes.func,
  postNewExerciseInRoutine: PropTypes.func
};

export default connect(
  mapStateToProps,
  { postNewRoutine, clearCurrentRoutine, postNewExerciseInRoutine }
)(WorkoutForm);
