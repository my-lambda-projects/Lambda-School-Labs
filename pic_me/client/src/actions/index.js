import axios from 'axios';
axios.defaults.withCredentials = true;

export const AUTH_USER_AUTHENTICATED = 'AUTH_USER_AUTHENTICATED';
export const AUTH_USER_UNAUTHENTICATED = 'AUTH_USER_UNAUTHENTICATED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_ERROR_RESET = 'AUTH_ERROR_RESET';

// signup
export const AUTH_SIGNUP_START = 'AUTH_SIGNUP_START';
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';
export const AUTH_SIGNUP_ERROR = 'AUTH_SIGNUP_ERROR';
export const AUTH_SIGNUP_FINISH = 'AUTH_SIGNUP_FINISH';

// login
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGIN_FINISH = 'AUTH_LOGIN_FINISH';

export const AUTH_RESET_ATTEMPTED = 'AUTH_RESET_ATTEMPTED';

// logout
export const AUTH_LOGOUT_START = 'AUTH_LOGOUT_START';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';
export const AUTH_LOGOUT_FINISH = 'AUTH_LOGOUT_FINISH';

export const CHANGE_SETTINGS_START = 'CHANGE_SETTINGS_START';
export const CHANGE_SETTINGS_SUCCESS = 'CHANGE_SETTINGS_SUCCESS';
export const CHANGE_SETTINGS_ERROR = 'CHANGE_SETTINGS_ERROR';
export const ACCOUNT_DELETE = 'ACCOUNT_DELETE';

// password
export const FORGOTPASSWORD = 'FORGOTPASSWORD';
export const RESETPASSWORD = 'RESETPASSWORD';

// photo
export const FETCH_MYUPLOADS = 'FETCH_MYUPLOADS';
export const UPDATED_MYUPLOAD_TAG = 'UPDATED_MYUPLOAD_TAG';
export const FETCH_MYUPLOADS_ERROR = 'FETCH_MYUPLOADS_ERROR';
export const FETCH_OTHERMES = 'FETCH_OTHERMES';
export const FETCH_OTHERMES_ERROR = 'FETCH_OTHERMES_ERROR';
export const FETCH_OTHERMES_PICTURE = 'FETCH_OTHERMES_PICTURE';
export const DELETE_MYUPLOADS = 'DELETE_MYUPLOADS';
export const FETCH_BROWSE = 'FETCH_BROWSE';
export const FETCH_MYCOLLECTION = 'FETCH_MYCOLLECTION';
export const FETCH_MYCOLLECTION_ERROR = 'FETCH_MYCOLLECTION_ERROR';
export const DELETE_COLLECTION_PICTURE = 'DELETE_COLLECTION_PICTURE';
export const PHOTO_CLAIM_FAIL = 'PHOTO_CLAIM_FAIL';
export const PHOTO_ERROR_RESET = 'PHOTO_ERROR_RESET';

/* user */
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_ERROR = 'GET_USER_ERROR';

// const ROOT = 'https://labpicme.herokuapp.com/api';
const ROOT = `/api`;

export const resetErrors = _ => {
	return dispatch => {
		dispatch({ type: AUTH_ERROR_RESET });
	};
};

export const resetPhotoErrors = _ => {
	return dispatch => {
		dispatch({ type: PHOTO_ERROR_RESET });
	};
};

export const authError = error => {
	return dispatch => {
		dispatch({ type: AUTH_ERROR, payload: error });
		setTimeout(() => {
			dispatch({ type: AUTH_ERROR });
		}, 4000);
	};
};

export const resetAuthAttempted = _ => {
	return dispatch => {
		dispatch({ type: AUTH_RESET_ATTEMPTED });
	};
};

export const register = (
	email,
	password,
	confirmPassword,
	firstName,
	lastName,
	history,
) => {
	return dispatch => {
		dispatch({ type: AUTH_SIGNUP_START });

		if (!email || !password || !confirmPassword || !firstName || !lastName) {
			dispatch({
				type: AUTH_SIGNUP_ERROR,
				payload: 'Please provide all fields',
			});
			dispatch({ type: AUTH_SIGNUP_FINISH });
			return;
		}

		if (password !== confirmPassword) {
			dispatch({ type: AUTH_SIGNUP_ERROR, payload: 'Passwords do not match' });
			dispatch({ type: AUTH_SIGNUP_FINISH });
			return;
		}

		axios
			.post(`${ROOT}/users`, {
				email,
				password,
				firstName,
				lastName,
				nickNames: [firstName],
			})
			.then(({ data }) => {
				dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: data.email });
				dispatch({ type: AUTH_LOGIN_START });
				axios
					.post(`${ROOT}/users/login`, { email, password })
					.then(_ => {
						dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
						dispatch({ type: GET_USER_INFO, payload: data });
						// dispatch({ type: AUTH_LOGIN_FINISH });
						// dispatch({ type: AUTH_SIGNUP_FINISH });
						history.push('/feature');
					})
					.catch(err => {
						dispatch({
							type: AUTH_LOGIN_ERROR,
							payload: err.response.data.message,
						});
						dispatch({ type: AUTH_LOGIN_FINISH });
						dispatch({ type: AUTH_SIGNUP_ERROR });
						dispatch({ type: AUTH_SIGNUP_FINISH });
					});
			})
			.catch(err => {
				dispatch({
					type: AUTH_SIGNUP_ERROR,
					payload: err.response.data.message,
				});
				dispatch({ type: AUTH_SIGNUP_FINISH });
			});
	};
};

export const login = (email, password, history) => {
	return dispatch => {
		dispatch({ type: AUTH_LOGIN_START });

		axios
			.post(`${ROOT}/users/login`, { email, password })
			.then(({ data }) => {
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
				dispatch({ type: GET_USER_INFO, payload: data.user });
				history.push('/feature');
				// history.go(-1);
			})
			.catch(error => {
				if (error.response) {
					if (error.response.status === 401) {
						dispatch({
							type: AUTH_LOGIN_ERROR,
							payload: `please check email and password and try again`,
						});
					} else {
						dispatch({
							type: AUTH_LOGIN_ERROR,
							payload: error.data,
						});
					}
					// dispatch({ type: AUTH_LOGIN_FINISH });
				}
			});
	};
};

export const mobil = (email, password, history) => {
	return dispatch => {
		dispatch({ type: AUTH_LOGIN_START });

		axios
			.post(`${ROOT}/users/login`, { email, password })
			.then(({ data }) => {
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
				dispatch({ type: GET_USER_INFO, payload: data.user });
				// history.push('/feature');
				history.go(-1);
			})
			.catch(error => {
				if (error.response) {
					if (error.response.status === 401) {
						dispatch({
							type: AUTH_LOGIN_ERROR,
							payload: `please check email and password and try again`,
						});
					}
				} else {
					dispatch({
						type: AUTH_LOGIN_ERROR,
						payload: error.data,
					});
				}
			});
		// dispatch({ type: AUTH_LOGIN_FINISH });
	};
};

export const logout = history => {
	return dispatch => {
		dispatch({ type: AUTH_LOGOUT_START });

		axios
			.get(`${ROOT}/users/logout`)
			.then(data => {
				dispatch({ type: AUTH_LOGOUT_SUCCESS });
				history.push('/logout');
			})
			.catch(err => console.log(err));
		// dispatch({
		// type: AUTH_LOGOUT_ERROR,
		// });
		// dispatch({ type: AUTH_LOGOUT_SUCCESS });
		// dispatch({ type: AUTH_LOGOUT_FINISH });
	};
};

export const twitter = history => {
	return dispatch => {
		axios
			.get(`${ROOT}/users/auth/twitter`, {
				// headers: { 'Access-Control-Allow-Origin': '*' },
			})
			.then(response => {
				console.log(response);
			})
			.catch(err => console.log(err));
	};
};

export const getAllUsers = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/users/all`)
			.then(response => {
				console.log(response);
			})
			.catch(err => console.log(err));
	};
};

export const getInfo = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/users/info`)
			.then(({ data }) => dispatch({ type: GET_USER_INFO, payload: data }))
			.catch(error =>
				dispatch({
					type: GET_USER_ERROR,
					payload: error.response.data.message,
				}),
			);
	};
};

export const account = (
	email,
	password,
	confirmPassword,
	// newPassword,
) => {
	return dispatch => {
		if (password !== confirmPassword) {
			dispatch({
				type: CHANGE_SETTINGS_ERROR,
				payload: 'passwords do not match',
			});
			return;
		}

		dispatch({ type: CHANGE_SETTINGS_START });
		axios
			.put(`${ROOT}/users/settings`, { user: { email, password } })
			.then(({ data }) => {
				dispatch({
					type: CHANGE_SETTINGS_SUCCESS,
					payload: data.email,
					message: `account settings updated successfully`,
				});
			})
			.catch(error =>
				dispatch({
					type: CHANGE_SETTINGS_ERROR,
					payload: error.response.data.message,
				}),
			);
	};
};

export const profile = (firstName, lastName, nickNames) => {
	const user = {};

	if (firstName) user.firstName = firstName;
	if (lastName) user.lastName = lastName;
	if (nickNames) user.nickNames = nickNames.split(', ');

	return dispatch => {
		dispatch({ type: CHANGE_SETTINGS_START });

		axios
			.put(`${ROOT}/users`, { user })
			.then(({ data }) => {
				dispatch({
					type: CHANGE_SETTINGS_SUCCESS,
					payload: data.email,
					message: `profile settings updated successfully`,
				});
				// dispatch({
				// 	type: GET_USER_INFO,
				// 	payload: data,
				// });
			})
			.catch(error =>
				dispatch({
					type: CHANGE_SETTINGS_ERROR,
					payload: error.response.data.message,
				}),
			);
	};
};

export const forgotPassword = email => {
	return dispatch => {
		axios.post(`${ROOT}/forgotpassword`, { email }).then(
			response => {
				console.log(response);
			},
			// .catch (error) ()
			// return authError(error.response.data.message)
		);
	};
};

export const deleteaccount = history => {
	return dispatch => {
		axios
			.delete(`${ROOT}/users`)
			.then(_ => {
				dispatch({ type: ACCOUNT_DELETE });
				history.push('/');
			})
			.catch(error =>
				dispatch({
					type: CHANGE_SETTINGS_ERROR,
					payload: error.response.data.message,
				}),
			);
	};
};

export const sendPayment = (stripeToken, pkg, history) => {
	return dispatch => {
		axios
			.post(`${ROOT}/users/payment`, { stripeToken, typeOfCharge: pkg })
			.then(({ data }) => {
				/* successful capture from Stripe */
				if (data.captured) {
					dispatch({ type: PHOTO_ERROR_RESET });
					dispatch({ type: GET_USER_INFO, payload: data.user });
					// console.log('payment successful');
					history.push(`/picture_browse`);
				} else {
					console.error('problem capturing payment from Stripe');
				}
			})
			.catch(err => console.log(err));
	};
};

export const authenticateUser = history => {
	return dispatch => {
		axios
			.post(`${ROOT}/users/login/check`)
			.then(({ data }) => {
				if (data.message === `user verified`) {
					dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.user.email });

					// history.go(-1);
				} else {
					window.alert(`login failed`);

					// dispatch({
					// 	type: AUTH_LOGIN_ERROR,
					// 	// payload: err.response.data.message,
					// });
					history.push(`/login`);
				}
			})
			.catch(err => {
				dispatch({
					type: AUTH_LOGIN_ERROR,
					// payload: err.response.data.message,
					payload:
						err.response.data.message /* session expired. please log in */,
				});
				// window.alert(`login failed at err`);

				// history.push('/login');
			});
	};
};

export const upload = _ => {
	const { tags, image } = this.state;
	let formData = new FormData();
	
	formData.append('tags', JSON.stringify(tags));
	formData.append('image', image);
	
	axios
		.post(`${ROOT}/pictures/upload`, formData)
		.then(res => console.log('upload successful'))
		.catch(err => console.error(err));
	this.refs.image.value = '';
};

export const browse = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/browse`)
			.then(({ data }) => {
				dispatch({ type: FETCH_BROWSE, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const browseCredit = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/browse`)
			.then(({ data }) => {
				dispatch({ type: FETCH_BROWSE, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const myuploads = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/myuploads`)
			.then(({ data }) => {
				if (data.length === 0) {
					dispatch({
						type: FETCH_MYUPLOADS_ERROR,
						payload: `no uploads found`,
					});
				}

				dispatch({ type: FETCH_MYUPLOADS, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const deletemyuploads = photoUploadId => {
	return dispatch => {
		axios
			.delete(`${ROOT}/pictures/myuploads/${photoUploadId}`)
			.then(response => {
				dispatch({ type: DELETE_MYUPLOADS, payload: photoUploadId });
			})
			.catch(err => console.log(err));
	};
};

export const othermephotos = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/othermes`)
			.then(({ data }) => {
				if (data.length === 0) {
					dispatch({
						type: FETCH_OTHERMES_ERROR,
						payload: `no pictures of you found. try adding different nicknames`,
					});
				}

				dispatch({ type: FETCH_OTHERMES, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const claimPicture = imgId => {
	return dispatch => {
		axios
			.post(`${ROOT}/pictures/othermes/${imgId}`)
			.then(({ data }) => {
				dispatch({ type: FETCH_OTHERMES_PICTURE, payload: imgId });
				dispatch({ type: GET_USER_INFO, payload: data });
			})
			.catch(error =>
				dispatch({
					type: PHOTO_CLAIM_FAIL,
					payload: error.response.data.message,
				}),
			);
	};
};

export const mycollection = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/mycollection`)
			.then(({ data }) => {
				if (data.length === 0) {
					dispatch({
						type: FETCH_MYCOLLECTION_ERROR,
						payload: `no collections found`,
					});
				}

				dispatch({ type: FETCH_MYCOLLECTION, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const deletePictureFromCollection = imgId => {
	return dispatch => {
		axios
			.delete(`${ROOT}/pictures/mycollection/${imgId}`)
			.then(({ data }) => {
				dispatch({ type: DELETE_COLLECTION_PICTURE, payload: imgId });
			})
			.catch(err => console.log(err));
	};
};

export const updateTagsOf = (imgId, newTags) => {
	return dispatch => {
		axios
			.put(`${ROOT}/pictures/myuploads/${imgId}`, { tags: newTags.split(', ') })
			.then(({ data }) => {
				dispatch({ type: UPDATED_MYUPLOAD_TAG, payload: data });
			})
			.catch(err => console.log(err));
	};
};
