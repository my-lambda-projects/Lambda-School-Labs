import React from 'react';

import RegisterMap from '../RegisterMap';

let host = process.env.REACT_APP_URL || 'http://localhost:8000';

export const Register = () => {
  console.log(host)

  const login = () => {
    window.open(`${host}/auth/instagram`, "_self");
  };

  const registerMe = () => {
    window.open(`${host}/auth/instagram`, "_self");
  };

  return(
    <>
    <div className="overlay">
      <div className="modal">
        <div className="head">
          <h1 className="ir">Geograpics</h1>
        </div>
        <h2>
          The place to organize your travel memories
        </h2>
        <button className="btn-login" onClick={login}>Sign in with Instagram</button>
        <p>
          Don't have an account?
        </p>
        <button className="btn-register" onClick={registerMe}>Register with Instagram</button>
      </div>
    </div>
    <section className="map">
        <header className="App-header">
          <RegisterMap />
        </header>
    </section>
    </>
  );
};

export default Register;