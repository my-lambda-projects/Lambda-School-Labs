
const initState = {authError: null}
const authReducer = (state=initState, action) => {
	switch (action.type){
		case "SIGNUP_SUCCESS":
			console.log('signup success')
			return {...state, authError: null}
		case "LOGIN_SUCCESS":
			console.log('login success');
			return {...state, authError: null}
		case "LOGIN_ERROR":
			return {...state, authError: action.payload}
		case "SIGNUP_ERROR":
			return {...state, authError: action.payload}
		case "FACEBOOK_SUCCESS":
			return {...state, authError: null}
		case "TWITTER_SUCCESS":
			return {...state, authError: null}
		case "GOOGLE_SUCCESS":
			return {...state, authError: null}
		case "RESET_SUCCESS":
			return {...state, authError: null}
		case "RESET ERROR":
			return {...state, authError: null}
		case "FACEBOOK_ERROR":
			return {...state, authError: action.payload}
		case "TWITTER_ERROR":
			return {...state, authError: action.payload}
		case "GOOGLE_ERROR":
			return {...state, authError: action.payload}
		case "RESET_ERROR":
			return {...state, authError: action.payload}
		default: 
			return state
	}
}

export default authReducer;