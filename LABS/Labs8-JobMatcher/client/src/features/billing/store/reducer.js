// const intialState = {
//     FETCHING_GET_PROFILE: false,
// 	data: null
// };
import * as actionType from "./action";

const intialState = {
  loading: false,
  total: 0,
  data: null,
  errors: null,
  complete: false
};

// export default (state = intialState, action) => {
// 	switch (action.type) {
//         case "GET_RANDOM_USER":
//             return {...state, FETCHING_GET_PROFILE: true};
// 		case "GET_RANDOM":
// 			return {...state, FETCHING_GET_PROFILE: false, data: action.user};
// 		default:
// 			return { ...state };
// 	}
// };
export default (state = intialState, action) => {
  // console.log(state);
  // console.log(action);

  switch (action.type) {
    case actionType.BILLING_REQUEST:
      return { ...state, loading: true };
    case actionType.BILLING_RESPONSE:
      return { ...state, loading: false, data: action.data };
    case actionType.BILLING_SUCCESS:
      return { ...state, loading: false, complete: true };
    case actionType.BILLING_ERROR:
      return { ...state, loading: false, errors: action.data };
    default:
      return { ...state };
  }
};
