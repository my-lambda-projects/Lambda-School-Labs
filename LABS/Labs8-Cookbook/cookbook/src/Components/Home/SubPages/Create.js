//This file contains code for /recipes page
import React, { Component } from "react";
import Preview from "./Preview";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import scraper from "../../../utils/scraper";
import Buttons from "./Buttons";
import DatePicker from "../../SubComponents/DatePicker.js";
import { GET_RECIPES_QUERY } from "./Recipes";
import { QUERY_RECIPE_EVENT } from "./Calendar";
import { Helmet } from "react-helmet";
import { toastMessage } from "../../../utils/toastify";

//Mutation for creating recipe
const CREATE_RECIPE_MUTATION = gql`
  mutation(
    $title: String!
    $prepTime: String!
    $servings: String!
    $image: String!
    $url: String!
    $mealType: String
    $dates: [String]!
  ) {
    createRecipe(
      title: $title
      prepTime: $prepTime
      servings: $servings
      image: $image
      url: $url
      mealType: $mealType
      dates: $dates
    ) {
      id
      title
      prepTime
      servings
      image
      url
    }
  }
`;

//Mutation for creating instructions
const CREATE_INSTRUCTION_MUTATION = gql`
  mutation($stepNum: Int!, $description: String!, $recipe: String!) {
    createInstruction(
      stepNum: $stepNum
      description: $description
      recipe: $recipe
    ) {
      stepNum
      description
      recipe {
        id
        title
      }
    }
  }
`;

//Mutation for creating ingredients
const CREATE_INGREDIENT_MUTATION = gql`
  mutation($name: String!, $quantity: String!, $recipe: String!) {
    createIngredient(name: $name, quantity: $quantity, recipe: $recipe) {
      name
      quantity
      recipe {
        id
        title
      }
    }
  }
`;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      type: "",
      loadingPreview: false,
      og_title: "",
      og_sitename: "",
      og_image: "",
      og_desc: "",
      prep_time: "",
      servings: "",
      og_url: "",
      instructions: [],
      ingredient_list: [],
      onDates: []
    };
  }

  //handle text change in url search box
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      type: "",
      loadingPreview: false,
      og_title: "",
      og_sitename: "",
      og_image: "",
      og_desc: "",
      prep_time: "",
      servings: "",
      og_url: "",
      instructions: [],
      ingredient_list: [],
      onDates: []
    });
    this.findRecipes();
  };

  //handle date picks in calendar
  handlePickDate = dates => {
    this.setState({ onDates: dates });
  };

  //handle meal selection buttons
  mealButtonHandler = e => {
    e.preventDefault();
    if (this.state.type === e.target.name) {
      this.setState({ type: "" });
    } else {
      this.setState({ type: e.target.name });
    }
  };

  //call scraper to extract data from url and save to state
  findRecipes = () => {
    this.setState({ loadingPreview: true }, async () => {
      try {
        const data = await scraper(this.state.query);
        this.setState({
          ...data,
          og_title: data.og_title ? data.og_title : "N/A",
          loadingPreview: false
        });
      } catch (error) {
        console.log(error.data);
        toastMessage("error", "There was an error! Failed to find recipe");
      }
    });
  };

  //handle save button
  onSave = async () => {
    //If no recipe title scraped, then save button won't work.
    if (!this.state.og_title || this.state.og_title === "N/A") return;

    try {
      //variables for createRecipe
      const recipeVariables = {
        title: this.state.og_title,
        prepTime: this.state.prep_time,
        servings: this.state.servings,
        image: this.state.og_image,
        url: this.state.og_url,
        mealType: this.state.type,
        dates: this.state.onDates
      };

      //run mutation for creating new recipe
      const { data } = await this.props.createRecipe({
        variables: recipeVariables,
        refetchQueries: [{ query: GET_RECIPES_QUERY }]
      });

      //lopp through each instruction and run createInstruction mutation
      if (this.state.instructions.length) {
        this.state.instructions.forEach(async (instruction, index) => {
          //variables for createInstruction
          const instructionVariables = {
            stepNum: index + 1,
            description: instruction,
            recipe: data.createRecipe.id
          };

          //execute createInstruction
          await this.props.createInstruction({
            variables: instructionVariables
          });
        });
      }

      //lopp through each ingredient and run createIngredient mutation
      if (this.state.ingredient_list.length) {
        this.state.ingredient_list.forEach(async ingredient => {
          //variables for createIngredient
          const ingredientVariables = {
            name: ingredient.name,
            quantity: ingredient.quantity,
            recipe: data.createRecipe.id
          };

          //execute createIngredient
          await this.props.createIngredient({
            variables: ingredientVariables,
            refetchQueries: [
              { query: GET_RECIPES_QUERY },
              { query: QUERY_RECIPE_EVENT }
            ]
          });
        });
      }
      toastMessage(
        "success",
        "Saved recipe successfully. You can find your recipe here!"
      );
      //redirect to recipes
      return this.props.history.push("/home/recipes");
    } catch (error) {
      console.log("onsave error: ", error.message);
      toastMessage("error", "There was an error! Failed to save recipe");
    }
  };

  //Switch classname of search input for styles
  handleSearchClass = () => {
    if (this.state.query) return "is-searching";
    return "not-searching";
  };

  render() {
    return (
      <div className="create-wrapper">
        <Helmet>
          <title>Create | COOKBOOK</title>
        </Helmet>
        <div className="search-and-save">
          <input
            className={this.handleSearchClass()}
            type="text"
            name="query"
            placeholder="recipe url"
            onChange={this.handleChange}
            value={this.state.query}
          />

          <button
            className={
              this.state.og_title === "N/A" || this.state.og_title === ""
                ? "save-button-inactive"
                : "save-button"
            }
            onClick={this.onSave}
          >
            save
          </button>
        </div>

        {!this.state.query && (
          <div className="tutorial-container">
            <div className="tutorial">
              <p>
                Paste in the url of a recipe from any website in order to save
                and schedule it.
              </p>

              <p>
                Only recipes from{" "}
                <a
                  href="http://www.allrecipes.com"
                  style={{ textDecoration: "none" }}
                >
                  <b>allrecipes.com</b>
                </a>{" "}
                and{" "}
                <a
                  href="http://www.geniuskitchen.com"
                  style={{ textDecoration: "none" }}
                >
                  <b>geniuskitchen.com</b>
                </a>{" "}
                currently support advanced features like instructions checklists
                and grocery list ingredients.
              </p>

              <p>
                Contact the team at <b>cookbook_project@yahoo.com</b> to request
                support for your favorite recipe website.
              </p>
            </div>
          </div>
        )}

        <div className="preview-and-schedule">
          {this.state.og_title === "N/A" ? (
            <div />
          ) : (
            <Preview
              og_title={this.state.og_title}
              og_sitename={this.state.og_sitename}
              og_image={this.state.og_image}
              og_desc={this.state.og_desc}
              loading={this.state.loadingPreview}
            />
          )}

          {this.state.og_title === "N/A" || this.state.og_title === "" ? (
            <div />
          ) : (
            <div className="schedule">
              <Buttons
                mealButtonHandler={this.mealButtonHandler}
                type={this.state.type}
              />

              <div className="create-date-picker">
                <DatePicker handlePickDate={this.handlePickDate} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

//Define and expose queries/mutations to Create component
const createRecipeMutation = graphql(CREATE_RECIPE_MUTATION, {
  name: "createRecipe"
});
const createInstructionMutation = graphql(CREATE_INSTRUCTION_MUTATION, {
  name: "createInstruction"
});
const createIngredientMutation = graphql(CREATE_INGREDIENT_MUTATION, {
  name: "createIngredient"
});

export default compose(
  createRecipeMutation,
  createInstructionMutation,
  createIngredientMutation
)(Create);
