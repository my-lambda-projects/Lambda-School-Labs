import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_PARENTS_START = 'FETCH_PARENTS_START';
export const FETCH_PARENTS_SUCCESS = 'FETCH_PARENTS_SUCCESS';
export const FETCH_PARENTS_FAILURE = 'FETCH_PARENTS_FAILURE';

export const getParentTable = () => dispatch => {
	dispatch({ type: FETCH_PARENTS_START });
	axiosWithAuth()
		.get(`/api?table=family`)
		.then(res => {
			dispatch({ type: FETCH_PARENTS_SUCCESS, payload: res.data.tableData });
		})
		.catch(err => {
			dispatch({ type: FETCH_PARENTS_FAILURE, payload: err.payload });
		});
};

export const FETCH_PARENTBYID_START = 'FETCH_PARENTBYID_START';
export const FETCH_PARENTBYID_SUCCESS = 'FETCH_PARENTBYID_SUCCESS';
export const FETCH_PARENTBYID_FAILURE = 'FETCH_PARENTBYID_FAILURE';

export const getParentById = id => dispatch => {
	dispatch({ type: FETCH_PARENTBYID_START });
	axiosWithAuth()
		.get(`/api/?table=family&where=id=${id}`)
		.then(res => {
			dispatch({
				type: FETCH_PARENTBYID_SUCCESS,
				payload: res.data.tableData[0]
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_PARENTBYID_FAILURE,
				payload: err.data
			});
		});
};

export const EDIT_PARENTBYID_START = 'EDIT_PARENTBYID_START';
export const EDIT_PARENTBYID_SUCCESS = 'EDIT_PARENTBYID_SUCCESS';
export const EDIT_PARENTBYID_FAILURE = 'EDIT_PARENTBYID_FAILURE';

export const toggleEditParent = () => dispatch => {
	dispatch({ type: EDIT_PARENTBYID_START });
};

export const editParentById = (id, state) => dispatch => {
	axiosWithAuth()
		.put(`/api/?table=family&where=id=${id}`, state)
		.then(res => {
			dispatch({
				type: EDIT_PARENTBYID_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: EDIT_PARENTBYID_FAILURE,
				payload: err.data
			});
		});
};

export const FETCH_STUDENTBYFAMILYID_START = 'FETCH_STUDENTBYFAMILYID_START';
export const FETCH_STUDENTBYFAMILYID_SUCCESS =
	'FETCH_STUDENTBYFAMILYID_SUCCESS';
export const FETCH_STUDENTBYFAMILYID_FAILURE =
	'FETCH_STUDENTBYFAMILYID_FAILURE';

export const getStudentByFamilyId = family_id => dispatch => {

	dispatch({ type: FETCH_STUDENTBYFAMILYID_START });
	axiosWithAuth()
		.get(`/api/?table=student&where=family_id=${family_id}`)
		.then(res => {
			dispatch({
				type: FETCH_STUDENTBYFAMILYID_SUCCESS,
				payload: res.data.tableData
			});
		})
		.catch(err => {
			dispatch({
				type: FETCH_STUDENTBYFAMILYID_FAILURE,
				payload: err.data
			});
		});
};

export const ADD_PARENT_START = 'ADD_PARENT_START';
export const ADD_PARENT_SUCCESS = 'ADD_PARENT_SUCCESS';
export const ADD_PARENT_FAILURE = 'ADD_PARENT_SUCCESS';

export const toggleAddParentComponent = () => dispatch => {
	dispatch({ type: ADD_PARENT_START });
};

export const addParent = parent => dispatch => {
	axiosWithAuth()
		.post(`/api?table=family`, parent)
		.then(res => {
			dispatch({ type: ADD_PARENT_SUCCESS });
		})
		.catch(err => {
			dispatch({ type: ADD_PARENT_FAILURE, payload: err.payload });
		});
};

export const SET_FILTER_PARENT = 'SET_FILTER_PARENT';
export const filterParentTable = searchTerm => dispatch => {
	dispatch({ type: SET_FILTER_PARENT, payload: searchTerm });
	dispatch({ type: FETCH_PARENTS_START });
	axiosWithAuth()
		.get(`/api?table=family`)
		.then(res => {
			searchTerm = searchTerm.toLowerCase();
			let parentList = res.data.tableData;
			parentList = parentList.filter(parent => {
				if (
					parent.mother_name &&
					parent.mother_name.toLowerCase().match(searchTerm)
				) {
					return true;
				}
				if (
					parent.father_name &&
					parent.father_name.toLowerCase().match(searchTerm)
				) {
					return true;
				}
				if (parent.id && parent.id.toString().match(searchTerm)) {
					return true;
				}
				if (
					parent.primary_telephone &&
					parent.primary_telephone.toString().match(searchTerm)
				) {
					return true;
				}

				if (
					parent.secondary_telephone &&
					parent.secondary_telephone.toString().match(searchTerm)
				) {
					return true;
				}
				return false;
			});
			dispatch({ type: FETCH_PARENTS_SUCCESS, payload: parentList });
		})
		.catch(err => {
			dispatch({ type: FETCH_PARENTS_FAILURE, payload: err.payload });
		});
};
