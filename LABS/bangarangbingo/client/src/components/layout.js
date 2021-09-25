import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';

const Layout = props => (
  <div className="page">
    <header>
      <div className="content">
        <div className="logo">
          <Link to="/cards"><img src="/images/logo-teal.gif" alt="Bangarang Bingo" /></Link>
        </div>
        <nav>
          <Link to="/" onClick={props.logout}>Sign Out</Link>
        </nav>
      </div>
    </header>
    <div className="navigation">
      <Breadcrumbs />
      <nav>
        <Link to="/cards">Cards</Link>
        <Link to="/billing">Billing</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/aboutUs">About</Link>
      </nav>
    </div>
    <section className="pageContent">
      {props.children}
    </section>
    <style jsx scoped>
      {`
        header {
          height: 80px;          
          box-shadow: 0 10px 30px 0 rgba(229,238,242,.5);
          background: #fff;
          position: relative;
          z-index: 1;
          max-width: 100%;
        }
        header .content {
          display: flex;
          justify-content: space-between;
          padding: 15px; 
          max-height: 100%;
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
          height: 80px;
        }
        header nav {
          align-self: center;
        }
        header nav :global(a) {
          background: #239999;
          color: white;
          padding: 10px 32px;
          border-radius: 30px;
          margin: 0px 5px 0px 5px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
        }
        .logo {
          max-width: 500px;
        }
        .logo :global(a) {
          display: inline-block;
          height: 100%;
        }
        .logo :global(img) {
          max-height: 100%;
          display: block;
          max-width: 100%;
        }
        .navigation {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding: 75px 20px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .navigation :global(a){
          display: block;
          text-decoration: none;
        }
        .navigation nav {
          display: flex;
          background: #fff;
          border-left: 4px solid #249999;
          border-right: 4px solid #249999;
          list-style-type: none;
          margin: 0;
          display: flex;
          align-items: center;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
          border-radius: 4px;
        
        }
        .navigation nav :global(a) {
          display: block;
          width: 100%;
          padding: 8px 20px;
          color: #249999;
          transition: all .3s;
        }
        .navigation nav :global(a:hover) {
          background: #249999;
          color: #fff;
          transition: all .3s;          
        }
        .pageContent {
          padding: 20px;
        }
      `}
    </style>
  </div>
);

export default Layout;
