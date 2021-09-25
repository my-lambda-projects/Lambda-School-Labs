import axiosWithAuth from '../../utils/axiosWithAuth';

export const getStudent = async student_id => {
	let result = await axiosWithAuth().get(`/student/${student_id}`);
	return result.data;
};
