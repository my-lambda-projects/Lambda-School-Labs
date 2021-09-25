import React, { Component } from "react";
import Loading from "../../SubComponents/Loading.js";
import RecipeCard from "./RecipeCard";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GET_RECIPES_QUERY = gql`
  query {
    recipes {
      id
      title
      image
      url
      prepTime
      servings
      events {
        id
        mealType
        date
      }
      ingredients {
        id
        name
        quantity
      }
      instructions {
        id
        stepNum
        description
        isCompleted
      }
    }
  }
`;

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filter: new Set([])
    };
  }

  handleAddRecipe() {
    this.props.history.push("create");
  }

  handleSearch = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFilter = meal => {
    let newFilter = new Set(this.state.filter);
    if (newFilter.has(meal)) newFilter.delete(meal);
    else newFilter.add(meal);

    this.setState({ filter: newFilter });
  };

  filterButtonClassName = meal => {
    return this.state.filter.has(meal)
      ? "button-selected"
      : "button-not-selected";
  };

  render() {
    return (
      <div className="recipesContainer">
        <Helmet>
          <title>Recipes | COOKBOOK</title>
        </Helmet>
        <div className="recipesFunctionBar">
          <div className="search-and-add-recipe">
            <button
              onClick={() => this.handleAddRecipe()}
              className="recipesAddRecipe"
            >
              + add recipe
            </button>
            <div className="search-input">
              <input
                type="text"
                name="search"
                placeholder="search"
                className="recipes-search"
                onChange={this.handleSearch}
                value={this.state.search}
              />
              <span className="searchicon" />
            </div>
          </div>
          <div className="recipesFilterContainer">
            <button
              className={this.filterButtonClassName("breakfast")}
              onClick={() => this.handleFilter("breakfast")}
            >
              <FontAwesomeIcon icon="coffee" /> breakfast
            </button>
            <button
              className={this.filterButtonClassName("lunch")}
              onClick={() => this.handleFilter("lunch")}
            >
              <span style={{ fontFamily: "burger-b" }}>b</span> lunch
            </button>
            <button
              className={this.filterButtonClassName("dinner")}
              onClick={() => this.handleFilter("dinner")}
            >
              <FontAwesomeIcon icon="utensils" /> dinner
            </button>
            <button
              className={this.filterButtonClassName("snack")}
              onClick={() => this.handleFilter("snack")}
            >
              <FontAwesomeIcon icon="apple-alt" /> snack
            </button>
            <button
              className={this.filterButtonClassName("dessert")}
              onClick={() => this.handleFilter("dessert")}
            >
              <FontAwesomeIcon icon="cookie-bite" /> dessert
            </button>
          </div>
        </div>
        <Query query={GET_RECIPES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error</div>;
            const recipesToRender = data.recipes.filter(recipe => {
              let hasMealType = true;
              if (this.state.filter.size) {
                const events = recipe.events.filter(e =>
                  this.state.filter.has(e.mealType)
                );
                hasMealType = events.length ? true : false;
              }
              const hasTitle = recipe.title
                .toLowerCase()
                .includes(this.state.search.toLowerCase());
              return hasMealType && hasTitle;
            });
            return (
              <div className="recipesCards">
                {recipesToRender.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    search={this.state.search}
                    filter={this.state.filter}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Recipes;
export { GET_RECIPES_QUERY };
