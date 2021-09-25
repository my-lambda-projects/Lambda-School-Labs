import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Breadcrumbs = ({ location }) => {
  const hasNumber = /\d/;
  const crumbs = location.pathname.split('/').slice(1).filter(crumb => !!crumb && !hasNumber.test(crumb)).map((crumb, i, loaf) => {
    const text = crumb.toLowerCase() === 'cards' || crumb.toLowerCase() === 'card' ? 'Dashboard' : (crumb.charAt(0).toUpperCase() + crumb.slice(1));
    const link = `/${loaf.slice(0, (i + 1)).join('/')}`;
    return { text, link };
  });

  return (
    <ul className="breadcrumbs">
      {crumbs.map((crumb, i) => {
        const key = i + crumb.text;
        const needsLink = crumb.link !== location.pathname;
        return (
          <li key={key}>
            {needsLink ? <Link to={crumb.link}>{crumb.text}</Link> : crumb.text}
          </li>);
      })}

      <style jsx scoped>
        {`
        .breadcrumbs {
          border-left: 4px solid #249999;
          list-style-type: none;
          margin: 0;
          display: flex;
          align-items: center;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
          padding: 6px 20px;
          border-radius: 4px;
          
        }
        li:before { content: "/"; padding-right: 3px; margin: 0 10px; }
        li:first-child:before { content: ""; padding-right: 0; }
        .breadcrumbs li {
          display: flex;
          align-items: center;
        }
        li :global(a) {
          color: #000;
          text-decoration: none;
        }
      `}
      </style>
    </ul>);
};

const mapStateToProps = state => ({
  location: state.router.location,
});

export default connect(mapStateToProps, {})(Breadcrumbs);
