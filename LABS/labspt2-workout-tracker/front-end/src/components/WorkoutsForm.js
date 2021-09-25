import React, { Component } from 'react';
import {
  postCategory,
  postExercise,
  getCategories,
  getExercises
} from '../actions/actions';
import { connect } from 'react-redux';

class WorkoutsForm extends Component {
  state = {
    exerciseName: '',
    reps: '',
    weight: '',
    sets: '',
    categoryId: null,
    category: '',
    selectedCategoryID: '',
    grabbedCategory: null,
    categories: []
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  categoryChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, categoryId: null });
  };

  selectChange = e => {
    document.getElementById('myText').value = e.target.value;
    this.setState({
      category: e.target.options[e.target.selectedIndex].value,
      categoryId: Number(
        e.target.options[e.target.selectedIndex].getAttribute('categoryid')
      )
    });
  };

  onClick = (grabbedCategory, e) => {
    this.setState({ grabbedCategory: e.target.value });
  };

  submitHandler = async e => {
    e.preventDefault();
    const newExercise = {
      exerciseName: this.state.exerciseName,
      reps: this.state.reps,
      weight: this.state.weight,
      sets: this.state.sets,
      categoryId: this.state.categoryId
    };
    const newCategory = {
      categoryName: this.state.category
    };

    if (this.state.category) {
      if (newExercise.categoryId) {
        this.props.postExercise(newExercise);
      } else {
        const newCategories = await this.props.postCategory(newCategory);
        let createdCategory = newCategories[newCategories.length - 1].id;
        newExercise.categoryId = createdCategory;
        this.props.postExercise(newExercise);
      }
    } else {
      alert(
        'Add a new Category or select an existing Category from the dropdown menu!'
      );
    }
  };

  render() {
    const { categories } = this.props;

    return (
      <div className="form-container workouts-form">
        <form onSubmit={this.submitHandler}>
          <label>Workout Creator:</label>

          <select name="" onChange={this.selectChange}>
            {categories.map(category => {
              return (
                <option
                  key={category.id}
                  value={category.categoryName}
                  categoryid={category.id}
                  onClick={this.onClick}
                >
                  {category.categoryName}
                </option>
              );
            })}
          </select>
          <input
            id="myText"
            type="text"
            name="category"
            onChange={this.categoryChangeHandler}
            placeholder="Add Category"
          />
          <input
            onChange={this.changeHandler}
            type="text"
            name="exerciseName"
            placeholder="Exercise Name"
          />
          <input
            onChange={this.changeHandler}
            type="text"
            name="weight"
            placeholder="Weight"
          />
          <input
            onChange={this.changeHandler}
            type="text"
            name="sets"
            placeholder="Sets"
          />
          <input
            onChange={this.changeHandler}
            type="text"
            name="reps"
            placeholder="Reps"
          />
          <button type="text">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    exercises: state.exercises,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { postCategory, postExercise, getCategories, getExercises }
)(WorkoutsForm);
