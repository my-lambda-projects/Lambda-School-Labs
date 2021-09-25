import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const NavBar = props => {
  const logout = e => {
    console.log("props is: ", props);
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    window.location = "/";
  };
  return (
    <div className="main-navigation">
      <nav className="hor-navbar navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Trivializer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gameslist" className="nav-link active">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/billing" className="nav-link active">
                Billing
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/setting" className="nav-link active">
                Setting
              </Link>
            </li>
            {localStorage.getItem("user") || sessionStorage.getItem("jwt") ? (
              <li className="nav-item">
                <div onClick={logout} className="nav-logout nav-link active">
                  Sign Out
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
      <div className="vertical-navbar">
        <ul className="nav flex-column">
          <div className="inner-nav">
            <li className="nav-item">
              <Link to="/gameslist" className="nav-link active">
                Games
              </Link>
            </li>
            {sessionStorage.getItem("userId") ? (
              <li className="nav-item">
                <Link to="/billing" className="nav-link">
                  Billing
                </Link>
              </li>
            ) : null}

            <li className="nav-item">
              <Link to="/setting" className="nav-link">
                Setting
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faqs" className="nav-link">
                FAQ's
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
