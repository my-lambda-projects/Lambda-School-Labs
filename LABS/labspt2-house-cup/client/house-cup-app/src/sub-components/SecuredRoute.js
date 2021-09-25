import React from 'react';
import { Route } from 'react-router-dom';
import auth from '../utils/Auth.js';

const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
            if (!auth.isAuthenticated()) {
              auth.login();
              return <div />;
            }
            return <Component {...props}/>;
          }}/>

);

export default SecuredRoute;

// function SecuredRoute(props) {
//   const { component: Component, path, data } = props;
//   return (
//     <Route 
//       path={path}
//       data={data}
//       render={(props) => {
//         if (!auth.isAuthenticated()) {
//           auth.login();
//           return <div />;
//         }
//         return <Component {...props}/>;
//       }}
//     />
//   );
// }




