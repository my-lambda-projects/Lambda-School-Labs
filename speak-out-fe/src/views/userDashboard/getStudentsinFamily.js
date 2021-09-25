import axiosWithAuth from "../../utils/axiosWithAuth";

export const getStudentsInFamily = async (userID, setUserData) => {

    let result = await axiosWithAuth().get("/users/" + userID + "/students");
    return result.data;
}