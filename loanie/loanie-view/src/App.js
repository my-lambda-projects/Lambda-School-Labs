import React from 'react';
import './App.css';
import Navbar from './Component/Navbar';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-text-container">
        <p className="App-text-item">
          The cutting edge communication tool that makes any mortgage process smooth and efficient!
        </p>
        <br />
        <br />
        <br />
      </div>
      <div className="button-container">
        <button
          className="App-button button1"
          onClick={() => {
            window.location = '/learn_more';
          }}
        >
          {' '}
          Learn More{' '}
        </button>
      </div>
    </div>
  );
}
