import axiosWithAuth from '../../utils/axiosWithAuth';
import API_URL from '../../config/apiUrl';

export const FETCH_PLACEMENTTESTS_START = 'FETCH_PLACEMENTTESTS_START';
export const FETCH_PLACEMENTTESTS_SUCCESS = 'FETCH_PLACEMENTTESTS_SUCCESS';
export const FETCH_PLACEMENTTESTS_FAILURE = 'FETCH_PLACEMENTTESTS_FAILURE';

export const getPlacementTests = () => dispatch => {
	dispatch({ type: FETCH_PLACEMENTTESTS_START });
	axiosWithAuth()
		.get(`/placementExam`)
		.then(res => {
			dispatch({
				type: FETCH_PLACEMENTTESTS_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({ type: FETCH_PLACEMENTTESTS_FAILURE, payload: err.payload });
		});
};

export const FETCH_PLACEMENTTESTTBYID_START = 'FETCH_PLACEMENTTESTTBYID_START';
export const FETCH_PLACEMENTTESTTBYID_SUCCESS =
	'FETCH_PLACEMENTTESTTBYID_SUCCESS';
export const FETCH_PLACEMENTTESTTBYID_FAILURE =
	'FETCH_PLACEMENTTESTTBYID_FAILURE';

export const getPlacementTestById = id => dispatch => {
	dispatch({ type: FETCH_PLACEMENTTESTTBYID_START });
	axiosWithAuth()
		.get(`/placementExam/student/${id}`)  
		.then(res => {
			dispatch({
				type: FETCH_PLACEMENTTESTTBYID_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_PLACEMENTTESTTBYID_FAILURE,
				payload: err.data
			});
		});
};

export const FETCH_PLACEMENTTESTTBYIDANDTYPE_START = 
	'FETCH_PLACEMENTTESTTBYIDANDTYPE_START';
export const FETCH_PLACEMENTTESTTBYIDANDONLINE_SUCCESS =
	'FETCH_PLACEMENTTESTTBYIDANDONLINE_SUCCESS';
export const FETCH_PLACEMENTTESTTBYIDANDORAL_SUCCESS =
	'FETCH_PLACEMENTTESTTBYIDANDORAL_SUCCESS';
export const FETCH_PLACEMENTTESTTBYIDANDTYPE_FAILURE =
	'FETCH_PLACEMENTTESTTBYIDANDTYPE_FAILURE';

export const getPlacementTestByIdAndOnline = (id) => dispatch => {
	dispatch({ type: FETCH_PLACEMENTTESTTBYIDANDTYPE_START });
	axiosWithAuth()
		.get(`/placementExam/examType/1/student/${id}`)  
		.then(res => {
			dispatch({
				type: FETCH_PLACEMENTTESTTBYIDANDONLINE_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_PLACEMENTTESTTBYIDANDTYPE_FAILURE,
				payload: err.data
			});
		});
};

export const getPlacementTestByIdAndOral = (id) => dispatch => {
	dispatch({ type: FETCH_PLACEMENTTESTTBYIDANDTYPE_START });
	axiosWithAuth()
		.get(`/placementExam/examType/2/student/${id}`)
		.then(res => {
			dispatch({
				type: FETCH_PLACEMENTTESTTBYIDANDORAL_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_PLACEMENTTESTTBYIDANDTYPE_FAILURE,
				payload: err.data
			});
		});
};

export const EDIT_PLACEMENTTESTTBYID_START = 'EDIT_PLACEMENTTESTTBYID_START';
export const EDIT_PLACEMENTTESTTBYID_SUCCESS =
	'EDIT_PLACEMENTTESTTBYID_SUCCESS';
export const EDIT_PLACEMENTTESTTBYID_FAILURE =
	'EDIT_PLACEMENTTESTTBYID_FAILURE';

export const toggleEditPlacement = () => dispatch => {
	
};

export const editPlacementTestById = (id, state) => dispatch => {
	
	axiosWithAuth()
		.put(`/placementExam/${id}`, state) 
		.then(res => {
			dispatch({
				type: EDIT_PLACEMENTTESTTBYID_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: EDIT_PLACEMENTTESTTBYID_FAILURE,
				payload: err.data
			});
		});
};

export const ADD_PLACEMENTTEST_START = 'ADD_PLACEMENTTEST_START';
export const ADD_PLACEMENTTEST_SUCCESS = 'ADD_PLACEMENTTEST_SUCCESS';
export const ADD_PLACEMENTTEST_FAILURE = 'ADD_PLACEMENTTEST_FAILURE';

export const addPlacementTest = (state) => dispatch => {
	dispatch({ type: ADD_PLACEMENTTEST_START })
	axiosWithAuth()
		.post(`/placementExam`, state)
		.then(res => {
			dispatch({
				type: ADD_PLACEMENTTEST_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: ADD_PLACEMENTTEST_FAILURE,
				payload: err
			});
		});
};
