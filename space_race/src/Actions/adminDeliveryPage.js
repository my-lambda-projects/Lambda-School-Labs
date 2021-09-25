import axios from 'axios';
import { WebSocketBridge } from 'django-channels'

export const GETTINGRACE = 'GETTINGRACE';
export const GOTRACE = 'GOTRACE';

export const SENDINGANSWER = 'SENDINGANSWER'

export const ERROR = 'ERROR';

const webSocketBridge = new WebSocketBridge();

// TODO: Change url for deployment
const url = 'ws://127.0.0.1:8000/ws/quiz';

export const gettingRace = (slug) => {
  return dispatch => {
    dispatch({type: GETTINGRACE})
    // let token = window.localStorage.getItem('Authorization')
    // axios.get(`${url}/${slug}/`)
    //   .then(response => {
    //     dispatch({type: GOTRACE, payload: response.data})
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     dispatch({type: ERROR, payload: error})
    //     console.error(error)
    //   })
    webSocketBridge.connect(`${url}/${slug}/`);
    let slugObject = { slug: slug}
    webSocketBridge.socket.addEventListener('open', function() {
      console.log("Connected to WebSocket");
      webSocketBridge.send(slugObject)
    })
    webSocketBridge.listen(function(action, stream) {
      console.log(action, stream);
      dispatch({type: GOTRACE, payload: action})
    })
  }
}

export const nextQuestion = (slug) => {
  return dispatch => {
    let obj = {
      "index": 0,
      "slug": slug
    }
    webSocketBridge.send(obj)

    webSocketBridge.listen(function(action, stream) {
      console.log(action, stream);
      dispatch({type: GOTRACE, payload: action})
    })
  }
}

export const sendingAnswer = (data) => {
  return dispatch => {
    dispatch({type: SENDINGANSWER})
    let student = JSON.parse(localStorage.getItem('student'))
    let allData = {...student, ...data}
    console.log('all data', allData)
    webSocketBridge.send(allData)

    webSocketBridge.listen(function(action, stream) {
      console.log(action, stream);
      dispatch({type: GOTRACE, payload: action})
    })
  }
}