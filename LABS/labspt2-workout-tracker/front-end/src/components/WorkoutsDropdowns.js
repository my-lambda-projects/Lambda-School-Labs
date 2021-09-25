import React, { Component } from 'react';
import { exerciseDefaults } from '../defaults/index';
import {
  getData,
  postCategory,
  postExercise,
  getCategories
} from '../actions/actions';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import './styles/WorkoutsView.sass';
import './styles/Style.sass';

class WorkoutsDropdowns extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const { categories } = this.props;
    const { exercises } = this.props;
    return (
      <div className="workouts-dropdowns-container">
        {categories !== undefined &&
          categories.map((category, i) => {
            return (
              <div className="form-container events-card">
                <Collapsible key={i} trigger={category.categoryName}>
                  {exercises !== undefined &&
                    exercises.length > 0 &&
                    exercises
                      .filter(exercise => {
                        return exercise.categoryId === category.id;
                      })
                      .map((exercise, index) => {
                        return <p key={index}> {exercise.exerciseName}</p>;
                      })}
                </Collapsible>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    categories: state.categories,
    exercises: state.exercises,
    error: state.error,
    fetchingUsers: state.fetching
  };
};

export default connect(
  mapStateToProps,
  { getData, postCategory, postExercise }
)(WorkoutsDropdowns);
