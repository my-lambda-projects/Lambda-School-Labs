import axios from 'axios';
import API_URL from '../config/apiUrl';

const axiosWithAuth = () => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            authorization: localStorage.getItem('token')
        }
    });
};

export default axiosWithAuth;