import {
    FETCH_PLACEMENTTESTS_START,
    FETCH_PLACEMENTTESTS_SUCCESS,
    FETCH_PLACEMENTTESTS_FAILURE,
    FETCH_PLACEMENTTESTTBYID_START,
    FETCH_PLACEMENTTESTTBYID_SUCCESS,
    FETCH_PLACEMENTTESTTBYID_FAILURE,
    FETCH_PLACEMENTTESTTBYIDANDTYPE_START,
    FETCH_PLACEMENTTESTTBYIDANDONLINE_SUCCESS,
    FETCH_PLACEMENTTESTTBYIDANDORAL_SUCCESS,
    FETCH_PLACEMENTTESTTBYIDANDTYPE_FAILURE,
    EDIT_PLACEMENTTESTTBYID_START,
    EDIT_PLACEMENTTESTTBYID_SUCCESS,
    EDIT_PLACEMENTTESTTBYID_FAILURE,
    ADD_PLACEMENTTEST_START,
    ADD_PLACEMENTTEST_SUCCESS,
    ADD_PLACEMENTTEST_FAILURE
  } from '../../actions/adminDashboardActions/placementTestAction';
  
  const initialState = {
        isLoading: false,
        error: null,
        placementTest: [],
        placementTestById: [],
        onlinePlacementTestById: [],
        oralPlacementTestById: [],
        isTestEditing: false,
        isTestEditted: false,
        isTestAdding: false,
        isTestAdded: false
  }
  
  export const placementTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACEMENTTESTS_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_PLACEMENTTESTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                placementTest: action.payload
            };
        case FETCH_PLACEMENTTESTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        /// get by ID 
        case FETCH_PLACEMENTTESTTBYID_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_PLACEMENTTESTTBYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                placementTestById: action.payload
            };
        case FETCH_PLACEMENTTESTTBYID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        // get by ID and typeID
        case FETCH_PLACEMENTTESTTBYIDANDTYPE_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_PLACEMENTTESTTBYIDANDONLINE_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    onlinePlacementTestById: action.payload
                };

        case FETCH_PLACEMENTTESTTBYIDANDORAL_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    oralPlacementTestById: action.payload
                };    
            
        case FETCH_PLACEMENTTESTTBYIDANDTYPE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        // Edit by ID
        case EDIT_PLACEMENTTESTTBYID_START:
            return {
                ...state,
                isTestEditing: !state.isTestEditing,
                error: null,
            }
        case  EDIT_PLACEMENTTESTTBYID_SUCCESS:
            return {
                ...state,
                isTestEditing: !state.isTestEditing,
                isTestEditted: true,
                studentById: action.payload
            }
        case EDIT_PLACEMENTTESTTBYID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case ADD_PLACEMENTTEST_START:
            return {
                ...state,
                isLoading: true,
                isTestAdding: !state.isTestAdding,
                error: null,
            }
        case ADD_PLACEMENTTEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isTestAdding: !state.isTestAdding,
                isTestAdded: true,
                placementTest: [action.payload, ...state.placementTest]
            }
        case ADD_PLACEMENTTEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                isTestAdding: !state.isTestAdding,
                isTestAdded: false,
                error: action.payload,
            }
        default: return state;
    }
  }