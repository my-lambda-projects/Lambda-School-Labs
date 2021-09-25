import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import Fade from "react-reveal/Fade";

const Landing = () => {

    return (
      <Fragment>
        {" "}
        <header>
          <div className="logo" />
          <nav>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </nav>
        </header>
        <section className="hero">
          <h1>
            Check My Tone <span className="fas fa-check-square" />
          </h1>
          <div className="sp-container">
            <div className="sp-content">
              <div className="sp-globe" />

              <h2 className="frame-5">
                <span>Write </span>
                <span>Analyze </span>
                <span>Send</span>
              </h2>
            </div>
          </div>
          <Link to="/register" className="cta-btn">
            GET STARTED
          </Link>

          <i className="arrow animated bounce fas fa-angle-down fa-3x" />
        </section>
        <div className="howitworks" id="how">
          <section className="tonework">
            <Fade top>
              <h3 className="title">How It Works</h3>
              <div className="container">
                <div className="row circ">
                  <div className="col-md-8 d-flex align-items-center mt-2">
                    <div className="circle-icon mr-4">1</div>
                    <div className="media-body">
                      <h5>Register New Account</h5>
                      <p>
                        Simply click{" "}
                        <Link to="/register" className="anchor">
                          here
                        </Link>{" "}
                        to register a new account and start using{" "}
                        <b>Check My Tone</b>
                        &nbsp;instantly. Login with your account and create a
                        new document.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 my-2">
                    <i className="fas fa-sign-in-alt fa-5x hiw-icon" />
                  </div>
                </div>
                <div className="row circ">
                  <div className="col-md-8 d-flex align-items-center my-4">
                    <div className="circle-icon mr-4">2</div>
                    <div className="media-body">
                      <h5>Write And Analyze</h5>
                      <p>
                        Start writing your message by filling in the necessary
                        fields and when you are ready hit <b>"Analyze"</b>. Our
                        application will do all the magic and assess the Tone of
                        your statement.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 mt-4">
                    <i className="fas fa-glasses fa-5x hiw-icon" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 d-flex align-items-center mt-4">
                    <div className="circle-icon mr-4">3</div>
                    <div className="media-body">
                      <h5>And You Are Done!</h5>
                      <p>
                        And that's it! You can view a detailed report by
                        pressing "Details" or directly send your message as an
                        e-mail from the Check My Tone application.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 mt-4">
                    <i className="fas fa-clipboard-check fa-5x hiw-icon" />
                  </div>
                </div>
              </div>
            </Fade>
          </section>
        </div>
        <section className="features">
          <Fade top>
            <h3 className="title">Additional Features</h3>

            <ul className="grid">
              <li>
                <i className="fas fa-save" />
                <h4>Store Multiple Edits</h4>
                <p>
                  Save <b>multiple edits</b> and come back to them whenever you
                  wish right where you left off
                </p>
              </li>
              <li>
                <i className="fas fa-search" />
                <h4>Detailed Analysis</h4>
                <p>
                  Get <b>detailed analysis</b> on your messages, whether it is a
                  professional e-mail to your boss or a casual e-mail to a
                  friend, you will be sure it has just the right{" "}
                  <b>
                    <em>Tone</em>
                  </b>
                </p>
              </li>
              <li>
                <i className="fa fa-cubes" />
                <h4>Send Emails Directly</h4>
                <p>
                  Create your e-mail instantly with the Check My Tone app and{" "}
                  <b>send it directly</b>
                  &nbsp;from here, no need to use external services!
                </p>
              </li>
            </ul>
          </Fade>
        </section>
        <section className="testimonials">
          <Fade top>
            <div className="text-box">
              <h3 className="title">What others say:</h3>
              <i className="fas fa-quote-left fa-2x" />
              <i className="fas fa-quote-right fa-2x" />
              <p className="quote">
                "Check My Tone has saved me from sending a poorly worded e-mail
                more times than I can remember!"
              </p>
              <p className="author">— Chris</p>

              <p className="quote">
                "Given my anxiety, I'm always worried how my words are going to
                be perceived by others. Check My Tone gives me the confidence
                that my message will be received as I intended."
              </p>
              <p className="author">— Clementine</p>

              <p className="quote">
                "This literally saved my job on at least one occasion!
                Definitely use it to check your e-mails!"
              </p>
              <p className="author">— Imran</p>
            </div>
          </Fade>
        </section>
      </Fragment>
    );
  }

export default Landing;
