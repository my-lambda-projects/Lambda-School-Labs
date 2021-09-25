import axios from 'axios';
import { push } from 'react-router-redux';
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://www.bangarangbingo.com' : 'http://localhost:8080';
export const initDownload = id => async (dispatch) => {
  try {
    const authToken = window.localStorage.getItem('token');
    const { data } = await axios.get(`/card/download/${id}`, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    window.open(`${ROOT_URL}/pdf/download/${id}`);
  } catch (e) {
    console.log('could not download');
  }
};

export default {
  initDownload
};