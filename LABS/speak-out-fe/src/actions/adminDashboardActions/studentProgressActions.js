import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_STUDENTPROGESS_START = 'FETCH_STUDENTPROGESS_START';
export const FETCH_STUDENTPROGESS_SUCCESS = 'FETCH_STUDENTPROGESS_SUCCESS';
export const FETCH_STUDENTPROGESS_FAILURE = 'FETCH_STUDENTPROGESS_FAILURE';

export const getStudentProgress = student_id => dispatch => {
	dispatch({ type: FETCH_STUDENTPROGESS_START });
	axiosWithAuth()
		.get(`/api/?table=progress_report&where=student_id=${student_id}`)
		.then(res => {
			dispatch({
				type: FETCH_STUDENTPROGESS_SUCCESS,
				payload: res.data.tableData[0] //taking off array lets me see payload in console and brings success message
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_STUDENTPROGESS_FAILURE,
				payload: err.data
			});
		});
};

export const CREATE_STUDENTPROGRESS_START = 'CREATE_STUDENTPROGRESS_START';
export const CREATE_STUDENTPROGRESS_SUCCESS = 'CREATE_STUDENTPROGRESS_SUCCESS';
export const CREATE_STUDENTPROGRESS_FAILURE = 'CREATE_STUDENTPROGRESS_FAILURE';
//fix this later
export const togglePostComponent = () => dispatch => {
	dispatch({ type: CREATE_STUDENTPROGRESS_START });
};

export const postStudentProgress = student => dispatch => {
	axiosWithAuth()
		.post(`/api/?table=progress_report`, student)
		.then(res => {
			//('POST ACTION:', res.data);
			dispatch({
				type: CREATE_STUDENTPROGRESS_SUCCESS,
				payload: res.data[0]
			});
		})
		.catch(err => {
			dispatch({
				type: CREATE_STUDENTPROGRESS_FAILURE,
				payload: err.data
			});
		});
};

export const EDIT_STUDENTPROGRESS_START = 'EDIT_STUDENTPROGRESS_START';
export const EDIT_STUDENTPROGRESS_SUCCESS = 'EDIT_STUDENTPROGRESS_SUCCESS';
export const EDIT_STUDENTPROGRESS_FAILURE = 'EDIT_STUDENTPROGRESS_FAILURE';

export const toggleEditProgressComponent = () => dispatch => {
	dispatch({ type: EDIT_STUDENTPROGRESS_START });
};

export const editStudentProgress = (student_id, state) => dispatch => {
	axiosWithAuth()
		.put(
			`/api/?table=progress_report&where=student_id=${student_id}`,
			state
		)
		.then(res => {
			dispatch({
				type: EDIT_STUDENTPROGRESS_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: EDIT_STUDENTPROGRESS_FAILURE,
				payload: err.data
			});
		});
};
