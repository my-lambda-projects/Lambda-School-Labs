import axiosWithAuth from "../../utils/axiosWithAuth";

export const getStudentCourses = async (student_id) => {

    let result = await axiosWithAuth()
        .get(`/student/${student_id}/courses`)
    return result.data;
}