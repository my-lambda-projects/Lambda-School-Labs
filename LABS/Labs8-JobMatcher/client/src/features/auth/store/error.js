import { ADD__ERROR, DELETE__ERROR } from "./actionTypes";

export const addErrorHandler = error => ({
	// dispatch handler for a new error
	type: ADD__ERROR,
	error
});
export const deletErrorHandler = data => ({
	// dispatch handler to delete  any existing error
	type: DELETE__ERROR,
	data
});
