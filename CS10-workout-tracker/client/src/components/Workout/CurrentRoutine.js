import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteExercise,
  deleteRoutine,
  updateRoutine,
  updateExercise
} from "../../actions";
import {
  Button,
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  InputGroup,
  ModalFooter
} from "reactstrap";
import { TweenLite } from "gsap";

class CurrentRoutine extends React.Component {

  constructor(props){
    super(props);
    // reference to the DOM node
    this.myElement = null;
    // reference to the animation
    this.myTween = null;
    this.myWorkout = null;
    this.myExercises = [];

    this.state = {
      routineName: "",
      exerciseName: "",
      weight: "",
      reps: "",
      sets: "",
      exerciseId: "",
      routineModal: false,
      exerciseModal: false,
      errors: {}
    };
  }

  componentDidUpdate() {
    this.myTween = TweenLite.from(this.myElement, 1, { y: -1000});
  }

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleRoutine = () => {
    const { title } = this.props.currentRoutine;
    this.setState({
      routineModal: !this.state.routineModal,
      routineName: title
    });
  };

  toggleExercise = (
    id,
    name = "name",
    weight = "5",
    reps = "5",
    sets = "5"
  ) => {
    this.setState({
      exerciseModal: !this.state.exerciseModal,
      exerciseName: name,
      weight: weight,
      reps: reps,
      sets: sets,
      exerciseId: id
    });
  };

  handleDelete = exerciseId => {
    this.props.deleteExercise(exerciseId);
  };

  handleDeleteRoutine = routineId => {
    this.props.deleteRoutine(routineId);
  };

  handleExerciseUpdate = () => {
    const { exerciseId, exerciseName, weight, reps, sets } = this.state;

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

    this.props.updateExercise(exerciseId, exerciseName, weight, reps, sets);

    this.setState({
      exerciseName: "",
      weight: "",
      reps: "",
      sets: "",
      exerciseId: "",
      exerciseModal: !this.state.exerciseModal,
      errors: {}
    });
  };

  handleRoutineUpdate = () => {
    const { _id } = this.props.currentRoutine;
    const { routineName } = this.state;
    const newErrors = {};
    if (routineName.trim() === "") {
      newErrors.routineName = "Required Routine Name";
    }

    if (Object.keys(newErrors).length > 0) {
      return this.setState({ errors: newErrors });
    }
    this.toggleRoutine();
    this.props.updateRoutine(_id, routineName);
    this.setState({ routineName: "" });
  };

  render() {
    const { currentRoutine } = this.props;

    return (
      <div className="current__routine">
        <div className="current__routine__container">
          {/* update routine modal   */}

          <Modal
            isOpen={this.state.routineModal}
            toggle={this.toggleRoutine}
            className="sign__in"
          >
            <ModalHeader toggle={this.toggleSignInModal}>
              Update Routine Name
            </ModalHeader>
            <ModalBody>
              <InputGroup>
                <Input
                  placeholder="New Routine Name"
                  value={this.state.routineName}
                  onChange={this.handleFieldChange}
                  name="routineName"
                  autoComplete="off"
                  maxLength="15"
                />
              </InputGroup>
              {this.state.errors.routineName ? (
                <span className="form__validation">
                  {this.state.errors.routineName}{" "}
                </span>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button className="submit-btn" onClick={this.handleRoutineUpdate}>
                Update Routine Name
              </Button>{" "}
              <Button className="submit-btn--grey" onClick={this.toggleRoutine}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* End update routine modal */}

          {/* Update Exercise modal */}
          <Modal
            isOpen={this.state.exerciseModal}
            toggle={this.toggleExercise}
            className="sign__in"
          >
            <ModalHeader toggle={this.toggleSignInModal}>
              Update Exercise
            </ModalHeader>
            <ModalBody>
              <InputGroup>
                <Input
                  placeholder="New Exercise Name"
                  value={this.state.exerciseName}
                  onChange={this.handleFieldChange}
                  name="exerciseName"
                  autoComplete="off"
                  maxLength="15"
                />
              </InputGroup>
              {this.state.errors.exerciseName ? (
                <p className="form__validation">
                  {this.state.errors.exerciseName}
                </p>
              ) : null}
              <InputGroup>
                <Input
                  placeholder="New Weight"
                  value={this.state.weight}
                  onChange={this.handleFieldChange}
                  name="weight"
                  autoComplete="off"
                  type="number"
                />
              </InputGroup>
              {this.state.errors.weight ? (
                <p className="form__validation">{this.state.errors.weight}</p>
              ) : null}
              <InputGroup>
                <Input
                  placeholder="New Reps"
                  value={this.state.reps}
                  onChange={this.handleFieldChange}
                  name="reps"
                  autoComplete="off"
                  type="number"
                />
              </InputGroup>
              {this.state.errors.reps ? (
                <p className="form__validation">{this.state.errors.reps}</p>
              ) : null}
              <InputGroup>
                <Input
                  placeholder="New Sets"
                  type="number"
                  value={this.state.sets}
                  onChange={this.handleFieldChange}
                  name="sets"
                  autoComplete="off"
                />
              </InputGroup>
              {this.state.errors.sets ? (
                <p className="form__validation">{this.state.errors.sets}</p>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button
                className="submit-btn"
                onClick={this.handleExerciseUpdate}
              >
                Update Exercise
              </Button>{" "}
              <Button
                className="submit-btn--grey"
                onClick={this.toggleExercise}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* End Exercise modal */}

          <h2>CURRENT ROUTINE</h2>
          <h3 className="current__title">- Routine Title -----------------</h3>
          <div className="exercise__title">
            <h3>{currentRoutine && currentRoutine.title}</h3>
            {currentRoutine ? (
              <div className="pencil__trash__icon__container">
                <i
                  className="fas fa-pencil-alt icon"
                  onClick={this.toggleRoutine}
                />
                <i
                  className="fas fa-trash-alt icon"
                  onClick={() => this.handleDeleteRoutine(currentRoutine._id)}
                />
              </div>
            ) : null}
          </div>
          <h3 className="current__title">- Exercises ---------------------</h3>
          <div className="exercise__list" ref={div => this.myElement = div}>
            {currentRoutine &&
              currentRoutine.exercises.map((exercise, index) => {
                return (
                  <div key={exercise._id} className="exercise__card" 
                    ref={div => this.myExercises[index] = div}
                  >
                    <div className="exercise__card__header">
                      <h3>{exercise.name}</h3>
                      <div className="pencil__trash__icon__container">
                        <i
                          className="fas fa-pencil-alt icon"
                          onClick={() =>
                            this.toggleExercise(
                              exercise._id,
                              exercise.name,
                              exercise.currentWeight,
                              exercise.currentReps,
                              exercise.currentSets
                            )
                          }
                        />
                        <i
                          className="fas fa-trash-alt icon"
                          onClick={() => this.handleDelete(exercise._id)}
                        />
                      </div>
                    </div>
                    <div className="exercise__card__body">
                      <div>Weight: {exercise.currentWeight} lbs</div>
                      <div>Reps: {exercise.currentReps}</div>
                      <div>Sets: {exercise.currentSets}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRoutine: state.RoutineManager.focusedRoutine
  };
};

CurrentRoutine.propTypes = {
  currentRoutine: PropTypes.object,
  deleteExercise: PropTypes.func,
  deleteRoutine: PropTypes.func,
  updateRoutine: PropTypes.func,
  updateExercise: PropTypes.func
};

export default connect(
  mapStateToProps,
  { deleteExercise, deleteRoutine, updateRoutine, updateExercise }
)(CurrentRoutine);
