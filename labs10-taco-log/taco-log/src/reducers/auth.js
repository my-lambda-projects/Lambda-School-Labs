const initialState = {    
    userLoggedIn: false
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                uid: action.uid,
                userLoggedIn: true
            };
        case 'LOGOUT':
            return {
                ...state,
                userLoggedIn: false
            };
        default:
            return state;
    }
};