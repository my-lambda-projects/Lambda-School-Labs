import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/Components.css";

const Faqs = () => {
  const logout = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };
  return (
    <div className="faqs-page">
      <div className="top-content">
        <div className="top-leftside">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                FAQ's
              </li>
            </ol>
          </nav>
        </div>
        {sessionStorage.getItem("jwt") && !localStorage.getItem("guest") ? (
          <div onClick={logout} className="top-rightside">
            <p>Log Out</p>
            <i class="fas fa-sign-out-alt" />
          </div>
        ) : null}
      </div>

      <div className="main-content">
        <Navbar />
        <div className="content-container faq-container">
          <h1>Frequently Asked Questions</h1>
          <div className="question-container">
            <p className="questions">Why should I sign up for an account? </p>
            <p className="answers">
              Signing up for an account lets you keep the games on your account. If you get
              questions that you really like, and you want to save them, signing up for an account
              lets you do that.
            </p>
          </div>
          <div className="question-container">
            <p className="questions">What do I get with a Paid membership? </p>
            <p className="answers">
              With a free account, you can only create at most 3 games, and have each game be at
              most 5 questions. A paid membership lets you create as many games as you want with as
              many questions as you want.
            </p>
          </div>
          <div className="question-container">
            <p className="questions">How long does my paid membership last?</p>
            <p className="answers">Forever! This is a buy one time membership. </p>
          </div>
          <div className="question-container">
            <p className="questions">How do I add games?</p>
            <p className="answers">
              You can add games by clicking on the "Games" Tab and hitting +, and type in a game
              name to get started. The calendar is to give you a sense of when you want to play.{" "}
            </p>
          </div>
          <div className="question-container">
            <p className="questions">Why do my games go away? </p>
            <p className="answers">If you are not logged in, the games don't save to an account.</p>
          </div>
          <div className="question-container">
            <p className="questions">Can I change the ordering of the questions?</p>
            <p className="answers">
              If you would like the ordering of questions to be different, you can click the
              question anywhere and drag it down to wherever you want it to be.
            </p>
          </div>
          <div className="question-container">
            <p className="questions">How do I change just 1 question if it's one I don't like?</p>
            <p className="answers">
              You can hit Replace question to take way the question you don't like. You can hit Undo
              as well if you decide you want it back.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
