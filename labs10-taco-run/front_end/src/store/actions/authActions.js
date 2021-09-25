import axios from 'axios';

const makeAxios = async (name, email, user_pic) => {
	axios.post('https://production-taco.herokuapp.com/users', {name: name, email: email, user_pic: user_pic })
	.then(res => {
		localStorage.setItem('user_id', res.data)
	})
}

export const reset = () => {
	return (dispatch) => {
		dispatch({type: 'RESET ERROR'})
	}
}

export const facebookAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {

			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			let user_pic = response.additionalUserInfo.profile.picture.data.url

			makeAxios(username, email, user_pic)
		})
		.then(() => {
			dispatch({type: "FACEBOOK_SUCCESS"})
		})
		.catch(error => {
			
			dispatch({type: 'FACEBOOK_ERROR', payload: error.message})
		})
	}
}

export const twitterAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.TwitterAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {

			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			let user_pic = response.additionalUserInfo.profile.picture.data.url

			makeAxios(username, email, user_pic)
		})
		.then(() => {
			dispatch({type: "TWITTER_SUCCESS"})
		})
		.catch(error => {
			dispatch({type: "TWITTER_ERROR", payload: error.message})
		})
	}
}

export const googleAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {

			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			let user_pic = response.additionalUserInfo.profile.picture

			makeAxios(username, email, user_pic)
		})
		.then(() => {
			dispatch({type: "GOOGLE_SUCCESS"})
		})
		.catch(error => {
			dispatch({type: "GOOGLE_ERROR", payload: error.message})
		})
	}
}
