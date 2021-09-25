import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout';
import UpdatePassword from './updatePassword';
import UpdateEmail from './updateEmail';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://www.bangarangbingo.com' : 'http://localhost:3000';

const Settings = props => (
  <Layout logout={props.logout}>
    <div className="root">
      <header>
        <h1>Update Your Account</h1>
      </header>
      <section className="content">
        <UpdatePassword />
        <UpdateEmail />
      </section>
    </div>
    <style jsx scoped>
      {`
      .root {
        background: #ffffff;
        max-width: 1440px;
        margin: 0 auto;
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 4px;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;        
      }
    `}
    </style>
  </Layout>
);

export default Settings;
