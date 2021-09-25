import React from 'react';

export default props => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '60rem',
        alignItems: 'center',
      }}
    >
      <div>
        <div className="typed-logo" style={{ marginBottom: '4rem' }}>
          <h1 className="signin--titles">
            giveMe
            <span className="slideout--dot">.</span>
            <br />
            <p className="signin--slogans">myMoney</p>
          </h1>
        </div>
        <h1>Invoice does not exist</h1>
      </div>
    </div>
  );
};
