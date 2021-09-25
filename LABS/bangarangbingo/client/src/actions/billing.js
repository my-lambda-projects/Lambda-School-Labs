
import axios from 'axios';
import { push } from 'react-router-redux';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://www.bangarangbingo.com' : 'http://localhost:8080';

export const setCard = ({ card, id }) => ({
  type: 'SET_CARD',
  payload: {
    card,
    id,
  },
});

export const initOrder = (name, card) => async (dispatch, getState) => {
  const { auth } = getState();
  const { user } = auth;
  const authToken = window.localStorage.getItem('token');
  const { data } = await axios.post(`${ROOT_URL}/card/create`, {
    card,
    title: name,
  }, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log('request data: ', data); 
  
  const { id } = data;
  if (id) {
    const createdCard = data.card;
    if (user.subscriber) {
      dispatch(push(`/card/download/${id}`));
    } else {
      dispatch(setCard({ card, id }));
      dispatch(push('/billing'));
    }
  }
  return;


  if (user.subscriber) {
    dispatch(push('/card/download'));
  } else {
    dispatch(setCard(card));
    dispatch(push('/billing'));
  }
};

export default {
  setCard,
  initOrder,
};
