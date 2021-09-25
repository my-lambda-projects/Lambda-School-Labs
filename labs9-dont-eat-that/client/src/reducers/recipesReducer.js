import * as actionTypes from '../actions/index';

const initialState = {
  fetching: false,
  recipes: [],
  recipe: null,
  error: null,
  rating: null
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_RECIPES:
      return { ...state, gettingRecipes: true };
    case actionTypes.GETTING_RECIPE:
      return { ...state, gettingRecipe: true };
    case actionTypes.GET_RECIPES:
      return { ...state, recipes: action.payload, gettingRecipes: false };
    case actionTypes.GET_OWN_RECIPES:
      return { ...state, recipes: action.payload, gettingRecipes: false };
    case actionTypes.GET_FOREIGN_RECIPES:
      return { ...state, recipes: action.payload, gettingRecipes: false };
    case actionTypes.GET_RECIPE:
      return { ...state, recipe: action.payload, gettingRecipe: false };
    case actionTypes.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case actionTypes.EDIT_RECIPE:
      return {
        ...state,
        recipe: { ...state.recipe, ...action.payload.recipe },
        recipes: action.payload.recipes
      };
    case actionTypes.DELETE_RECIPE:
      return { ...state, recipes: action.payload };
    case actionTypes.RATING_CHANGE:
      return {
        ...state,
        recipe: { ...state.recipe, ratings: action.payload.newRatings },
        recipes: action.payload.newRecipes
      };
    case actionTypes.REMOVE_USER:
      return initialState;
    case actionTypes.ERROR:
      return {
        ...state,
        gettingRecipes: false,
        error: action.payload
      };
    default:
      return state;
  }
};
