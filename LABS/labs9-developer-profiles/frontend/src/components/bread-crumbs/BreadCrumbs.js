import React from "react";
import "antd/dist/antd.css";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import styled from 'styled-components'

const Items = () => (
  <ul className="app-list">
    <li>
      <Link to="/user/1">User 1</Link> : <Link to="/user/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/user/2">User 2</Link> : <Link to="/user/2/detail">Detail</Link>
    </li>
  </ul>
);

const breadcrumbNameMap = {
  "/user": "User",
  "/user/1": "User Association 1",
  "/user/2": "User Association 2",
  "/user/1/detail": "Detail 1",
  "/user/2/detail": "Detail 2"
};

const Breadcrumbs = withRouter(props => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  return (
    <Demo>
      <div className="demo-nav">
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
      </div>
      <Switch>
        <Route path="/user" component={Items} />
        <Route render={() => <span>Home Page</span>} />
      </Switch>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </Demo>
  );
});

const Demo = styled.div`
  margin: 16px;

  .demo-nav {
    height: 30px;
    line-height: 30px;
    margin-bottom: 16px;
    background: #f8f8f8;

    a {
      padding: 0 1%;

      .app-list {
        margin-top: 16px;
      }
    }
  }
`;

export default Breadcrumbs;
