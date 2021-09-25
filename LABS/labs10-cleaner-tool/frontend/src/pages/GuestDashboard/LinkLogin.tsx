import React, {
  useEffect,
  useContext,
  useRef,
  MutableRefObject,
  FunctionComponent,
  useState,
} from 'react';
import axiosFetch from '../../helpers/axiosFetch';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import firebase, { Unsubscribe, User } from 'firebase';
import app from '../../firebase.setup';
import { UserContext } from '../../UserContext';
import { parseQuery } from '../utils/parseQuery';
const backendURL = process.env.REACT_APP_backendURL;

interface LoginProps extends RouteComponentProps {
  onUser: any;
  match: any;
}

const LinkLogin: FunctionComponent<LoginProps> = ({
  history,
  location,
  match,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { state, dispatch } = useContext(UserContext);
  const setRole = (role: string) => dispatch({ type: 'setRole', payload: role })
  const observer: MutableRefObject<any> = useRef<Unsubscribe>(null);
  let email: any;
  email = localStorage.getItem('emailForSignIn')
  useEffect(() => {
    observer.current = app
      .auth()
      .onAuthStateChanged((newUser) => setUser(newUser));
    return () => {
      if (observer.current !== null) {
        observer.current();
      }
    };
  }, []);

  useEffect(() => {
    submitUser();
  }, [user]);

  useEffect(() => {
    if (app.auth().isSignInWithEmailLink(window.location.href)) {
      let email: any;
      email = localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt(
          'Please provide your email to see your dashboard',
        );
      }
      app
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch((error) => {
          throw error;
        });
    }
  }, []);

  const constructURL = async (args: any) => {
    try {
      const stayInfo = await axiosFetch('get', `${backendURL}/stays/${args.id}`)
      //@ts-ignore
      let baseDir: string = '';
      let parameter1 = '';
      if (args.redir === 'survey') {
        if (args.isguest === 'true') {
          //@ts-ignore
          const guestId = stayInfo[0].data.guest_id
          parameter1 = `guestdashboard/${guestId}/surveys`
          setRole('guest')
        }
      }

      if (args.redir === 'dashboard') {
        if (args.isguest === 'true') {
          const guestId = args.id
          parameter1 = `guestdashboard/${guestId}`
          setRole('guest')
        }
      }

      const finalizedURL: string = `${baseDir}/${parameter1}`
      console.log(finalizedURL)
      return finalizedURL
    } catch (e) {
      return `${window.location.hostname}`
      console.log(e)
    }
  }

  async function submitUser() {
    if (user !== null) {
      const { email, uid, displayName, photoURL } = user;
      const nUser = {
        email,
        ext_it: uid,
        full_name: displayName,
        photoUrl: photoURL,
        role: 'guest',
      };
      const url =
        process.env.REACT_APP_backendURL ||
        'https://labs10-cleaner-app-2.herokuapp.com';

      // switch ()

      try {
        const { data } = await axios.post(`${url}/users/`, nUser);
        localStorage.setItem('token', data.token);
        localStorage.setItem('subscription', data.stripePlan);
        const parsedQuery = parseQuery(location.search)
        const finalDestination = await constructURL(parsedQuery);
        history.push(finalDestination);
      } catch (e) {
        throw e;
      }
    }
  }

  return <div>Place holder</div>;
};

export default LinkLogin;
