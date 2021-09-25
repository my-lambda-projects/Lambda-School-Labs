import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql } from "react-apollo";
import { DELETE_RECIPE_MUTATION } from "./RecipeCard";
import { GET_RECIPES_QUERY } from "./Recipes";
import { QUERY_RECIPE_EVENT } from "./Calendar";
import Iframe from "react-iframe";
import { toastMessage } from "../../../utils/toastify";
import Checkbox from "../../SubComponents/Checkbox";

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: []
    };
  }

  // Adds sorted data for instructions to the components state.
  componentDidMount() {
    let instructions = this.props.location.state.instructions;
    instructions.sort(this.compare);
    this.setState({ instructions });
  }

  deleteHandler = async () => {
    try {
      await this.props.deleteRecipe({
        variables: { id: this.props.location.state.id },
        refetchQueries: [
          { query: GET_RECIPES_QUERY },
          { query: QUERY_RECIPE_EVENT }
        ]
      });
      this.props.history.replace("/home/recipes");
    } catch (error) {
      console.log(error.message);
      toastMessage("error", "There was an error! Failed to delete recipe");
    }
  };

  // helper function: re-orders instructions based on stepNum
  compare(a, b) {
    let comparison = 0;
    let instA = a.stepNum;
    let instB = b.stepNum;
    if (instA > instB) {
      comparison = 1;
    } else if (instA < instB) {
      comparison = -1;
    }
    return comparison;
  }

  toggleCheckBox = stepNumArg => {
    // filter through instuction state to find matching instruction by id
    let inst = this.state.instructions.filter(inst => {
      return inst.stepNum === stepNumArg;
    });
    // make a copy of the state
    let copyArr = this.state.instructions;
    // toggle specified instruction's isCompleted field in copy array
    copyArr[inst[0].stepNum - 1].isCompleted = !copyArr[inst[0].stepNum - 1]
      .isCompleted;
    // re-set state with toggled checkmark
    this.setState({ instructions: copyArr });
  };

  render() {
    let whitelisted =
      this.props.location.state.url.includes("www.allrecipes.com") ||
      this.props.location.state.url.includes("www.geniuskitchen.com");

    const instructions = whitelisted ? (
      <div className="instructions">
        {this.state.instructions.map((inst, index) => (
          <div
            className={inst.isCompleted ? "instruction-checked" : "instruction"}
            key={index}
          >
            <Checkbox
              isCompleted={inst.isCompleted}
              callbackArg={inst.stepNum}
              callback={this.toggleCheckBox}
            />
            <div className="description">{inst.description}</div>
          </div>
        ))}
      </div>
    ) : (
      <div className="iframe-container">
        <Iframe
          url={this.props.location.state.url}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
            marginRight: "20px"
          }}
          id="iframe"
          className="iframe"
          display="initial"
          position="relative"
          allowFullScreen
        />
      </div>
    );

    return (
      <div className="recipe-page">
        <div className="recipe-header">
          <span className="recipe-title">
            {this.props.location.state.title}
          </span>
          <div className="icon-container">
            <a
              className="link"
              href={"" + this.props.location.state.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon="link" />
            </a>
            <FontAwesomeIcon
              icon="trash-alt"
              className="delete"
              onClick={this.deleteHandler}
            />
          </div>
        </div>
        <div className="left-container">
          <div className="left-content">
            <div
              className="recipe-img"
              style={{
                backgroundImage: `url(${this.props.location.state.image})`
              }}
            />
            <div className="info-bar">
              <div className="scheduled-for">
                <span className="text">scheduled for:</span>
                {this.props.location.state.events.length ? (
                  <div className="event">
                    <div className="meal">
                      {
                        this.props.location.state.events[
                          this.props.location.state.events.length - 1
                        ].mealType
                      }
                    </div>
                    <div className="date">
                      {new Date(
                        this.props.location.state.events[
                          this.props.location.state.events.length - 1
                        ].date
                      ).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontWeight: "bold" }}>No events scheduled</div>
                )}
              </div>
              <div className="recipe-info">
                <div className="cook-time">
                  <span className="title">Cook Time:</span>
                  <span className="time">
                    {this.props.location.state.prepTime}
                  </span>
                </div>
                <div className="servings">
                  <span className="title">Servings:</span>
                  <span className="size">
                    {this.props.location.state.servings}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {whitelisted ? (
            <div className="ingredients">
              <div className="title">Ingredients</div>
              {this.props.location.state.ingredients.map((ing, index) => (
                <div className="ingredient" key={index}>
                  <span className="qty">
                    {ing.quantity !== "0" ? ing.quantity : ""}
                  </span>
                  <span className="name">{ing.name}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="right-container">
          <div className="title">Instructions</div>
          {instructions}
        </div>
      </div>
    );
  }
}

export default graphql(DELETE_RECIPE_MUTATION, {
  name: "deleteRecipe"
})(RecipeView);
