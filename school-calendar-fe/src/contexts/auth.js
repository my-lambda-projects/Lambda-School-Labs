import React, { useCallback, useContext, createContext, useState } from 'react';
import useGapi from '../hooks/useGapi';
import calendarApi from '../utils/calendarApi';

const AuthContext = createContext();

//This is where the useGapi hook is being utilized and passed the correct options to authenticate the user. Then this component returns the context containing googleApi (itself containing the currentUser and helper functions like signin and out ) and the calendar api. The implementtion is strange but it works, so... you can avoid a lot of heartache by just leaving it be. Trust me, we tried.
function AuthProvider({ children }) {
  const [api, setApi] = useState(null);
  const googleApi = useGapi({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/calendar.events',
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    ],
    ux_mode: 'redirect',
    redirect_uri: `${process.env.REACT_APP_BASE_URL}/authenticate/google`,
    onLoaded: useCallback(gapi => {
      setApi(calendarApi(gapi));
    }, [])
  });

  return (
    <AuthContext.Provider
      value={{
        googleApi,
        api
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log('context', context);
  // console.log('IDTOKEN WOOT HOOT PARTAY', context.googleApi.IDToken);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
