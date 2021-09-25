import {
  FAVORITES_SEARCH_START,
  FAVORITES_SEARCH_COMPLETE,
  FAVORITES_SEARCH_ERROR,
  FAVORITE_ADD_START,
  FAVORITE_ADD_COMPLETE,
  FAVORITE_ADD_ERROR,
  FAVORITES_DELETE_START,
  FAVORITES_DELETE_COMPLETE,
  FAVORITES_DELETE_ERROR,
  FAVORITES_FETCH_START,
  FAVORITES_FETCH_COMPLETE,
  FAVORITES_FETCH_ERROR
} from "../actions/favoritesActions";

const initialState = {
  locations: [],
  favorites: [],
  fetchingFavorites: false,
  fetchedFavorites: false,
  searchingFavorites: false,
  searchedFavorites: false,
  deletingFavorite: false,
  deletedFavorite: false,
  error: null
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITES_FETCH_START:
      return {
        ...state,
        fetchingFavorites: true
      };

    case FAVORITES_FETCH_COMPLETE:
      return {
        ...state,
        favorites: action.payload,
        fetchingFavorites: false,
        fetchedFavorites: true
      };

    case FAVORITES_FETCH_ERROR:
      return {
        ...state,
        error: "Error fetching favorites"
      };

    case FAVORITES_SEARCH_START:
      return {
        ...state,
        searchingFavorites: true,
        searchedFavorites: false
      };
    case FAVORITES_SEARCH_COMPLETE:
      return {
        ...state,
        locations: action.payload,
        searchingFavorites: false,
        searchedFavorites: true,
        error: null
      };

    case FAVORITES_SEARCH_ERROR:
      return {
        ...state,
        error: "Error searching favorites"
      };

    case FAVORITE_ADD_START:
      return {
        ...state,
        addingFavorite: true,
        addedFavorites: false
      };
    case FAVORITE_ADD_COMPLETE:
      return {
        ...state,
        favorites: action.payload,
        addingFavorite: false,
        addedFavorites: true
      };

    case FAVORITE_ADD_ERROR:
      return {
        ...state,
        error: "Error adding favorite"
      };

    case FAVORITES_DELETE_START:
      return {
        ...state,
        deletingFavorite: true
      };
    case FAVORITES_DELETE_COMPLETE:
      return {
        ...state,
        deletingFavorite: false,
        deletedFavorite: true,
        favorites: state.favorites.filter(f => f.id !== action.id)
      };
    case FAVORITES_DELETE_ERROR:
      return {
        ...state,
        error: "Error deleting a favorite"
      };

    default:
      return state;
  }
};

export default favoritesReducer;
