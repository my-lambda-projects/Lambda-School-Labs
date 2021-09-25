import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';

class Home extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <div id="preloader">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </div>

        {/* <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>

            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#contact">Signup/Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}

        <div id="carousel-wrapper">
          <div
            id="home-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="container">
              <div className="carousel-arrows">
                <a
                  className="home-carousel-left"
                  href="#home-carousel"
                  data-slide="prev"
                >
                  <i className="fa fa-long-arrow-left" />
                </a>
                <a
                  className="home-carousel-right"
                  href="#home-carousel"
                  data-slide="next"
                >
                  <i className="fa fa-long-arrow-right" />
                </a>
              </div>
            </div>
            <div className="carousel-inner">
              <div className="item item1 active">
                <div className="carousel-caption container">
                  <h3 className="wow fadeInUp animation-3s">Track Time</h3>
                  <h1 className="wow fadeInUp animation-4s">
                    Accurately Invoice Your Hours Worked
                  </h1>
                  <p className="wow fadeInUp animation-5s">
                    You’ll always invoice for exactly what you’re worth when you
                    track time. You and your team can log your hours and then
                    automatically put them onto an invoice.
                  </p>
                </div>
              </div>
              <div className="item item2">
                <div className="carousel-caption container">
                  <h3 className="wow fadeInUp animation-3s">
                    Generate Invoices
                  </h3>
                  <h1 className="wow fadeInUp animation-4s">Get Paid</h1>
                  <p className="wow fadeInUp animation-5s">
                    Say goodbye to remembering how long you and your team spent
                    working on a client. Just start a timer and get down to
                    business – when you’re done, you’ll have an accurate time
                    log ready to pop onto an invoice.
                  </p>
                </div>
              </div>
              <div className="item item3">
                <div className="carousel-caption container">
                  <h3 className="wow fadeInUp animation-3s">On The Go?</h3>
                  <h1 className="wow fadeInUp animation-4s">
                    Run Your Business From Anywhere
                  </h1>
                  <p className="wow fadeInUp animation-5s">
                    Keep tabs on your business no matter where you are. With the
                    TimeTracker mobile app, you can capture your hours all from
                    the palm of your hand.
                  </p>
                </div>
              </div>
            </div>

            <div className="brand-promotion">
              <div className="container">
                <div className="media row">
                  <div className="col-sm-4 col-xs-12">
                    <div className="brand-content wow fadeInUp animation-3s">
                      <img
                        className="img-responsive"
                        src="img/ico/diamond.png"
                        alt=""
                      />
                      <div className="media-body">
                        <h4>Tracking</h4>
                        <p>Keep track of your hours worked.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-12">
                    <div className="brand-content wow fadeInUp animation-4s">
                      <img
                        className="img-responsive"
                        src="img/ico/briefcase.png"
                        alt=""
                      />
                      <div className="media-body">
                        <h4>Details</h4>
                        <p>
                          Add detailed time entry notes for each logged entry.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-12">
                    <div className="brand-content wow fadeInUp animation-5s">
                      <img
                        className="img-responsive"
                        src="img/ico/piggy-bank.png"
                        alt=""
                      />
                      <div className="media-body">
                        <h4>Invoice</h4>
                        <p>Generate invoices right from the dashboard.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section section-padding" id="about">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <img
                  src="../../assets/better_opt.png"
                  className="img-responsive wow fadeInLeft animation-3s"
                  alt="about"
                />
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="section-title wow fadeInDown animation-3s">
                  <h5>About Us</h5>
                  <h1>What We Do</h1>
                </div>

                <p>
                  Every second counts. Start tracking your time in Time Tracker
                  and see exactly how much time you’re spending on clients and
                  projects. And when the work’s done, easily generate an invoice
                  with just a click.
                </p>

                <h1 className="left">
                  $ <span>Get That Paper</span>
                </h1>
                <div className="triangle" />
              </div>
            </div>
          </div>
        </div>

        <div className="testimonial-section section-padding">
          <div className="container">
            <div className="section-title1 text-center">
              <h5>Peoples</h5>
              <h1>What Our Customers Say</h1>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div
                  className="carousel slide"
                  data-ride="carousel"
                  id="quote-carousel"
                >
                  <div className="carousel-inner text-center">
                    <div className="item active">
                      <blockquote>
                        <div className="row">
                          <div className="col-sm-8 col-sm-offset-2">
                            <h4>Mary Kom</h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. !
                            </p>
                          </div>
                        </div>
                      </blockquote>
                    </div>

                    <div className="item">
                      <blockquote>
                        <div className="row">
                          <div className="col-sm-8 col-sm-offset-2">
                            <h4>James Watson</h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur.{' '}
                            </p>
                          </div>
                        </div>
                      </blockquote>
                    </div>

                    <div className="item">
                      <blockquote>
                        <div className="row">
                          <div className="col-sm-8 col-sm-offset-2">
                            <h4>Kane Washington</h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. .
                            </p>
                          </div>
                        </div>
                      </blockquote>
                    </div>

                    <ol className="carousel-indicators">
                      <li
                        data-target="#quote-carousel"
                        data-slide-to="0"
                        className="active"
                      >
                        <img
                          className="img-responsive "
                          src="img/testi-1.png"
                          alt=""
                        />
                      </li>
                      <li data-target="#quote-carousel" data-slide-to="1">
                        <img
                          className="img-responsive"
                          src="img/testi-1.png"
                          alt=""
                        />
                      </li>
                      <li data-target="#quote-carousel" data-slide-to="2">
                        <img
                          className="img-responsive"
                          src="img/testi-1.png"
                          alt=""
                        />
                      </li>
                    </ol>
                  </div>

                  <a
                    data-slide="prev"
                    href="#quote-carousel"
                    className="left carousel-control"
                  >
                    <i className="fa fa-angle-left" />
                  </a>
                  <a
                    data-slide="next"
                    href="#quote-carousel"
                    className="right carousel-control"
                  >
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>

            <div className="client-section">
              <div className="row">
                <div className="col-md-2 col-sm-2 col-xs-4 text-center wow zoomIn animation-2s">
                  <img
                    src="img/partner/01.png"
                    className="img-responsive"
                    alt=""
                  />
                </div>
                <div className="col-md-2 col-sm-2 col-xs-4 text-center wow zoomIn animation-3s">
                  <img
                    src="img/partner/02.png"
                    className="img-responsive"
                    alt=""
                  />
                </div>
                <div className="col-md-2 col-sm-2 col-xs-4 text-center wow zoomIn animation-4s">
                  <img
                    src="img/partner/03.png"
                    className="img-responsive"
                    alt=""
                  />
                </div>
                <div className="col-md-2 col-sm-2 col-xs-4 text-center wow zoomIn animation-5s">
                  <img
                    src="img/partner/04.png"
                    className="img-responsive"
                    alt=""
                  />
                </div>
                <div className="col-md-2 col-sm-2 col-xs-4 text-center wow zoomIn animation-6s">
                  <img
                    src="img/partner/05.png"
                    className="img-responsive"
                    alt=""
                  />
                </div>
                <div className="col-md-2 col-sm-2 col-xs-4 text-center wow zoomIn animation-7s">
                  <img
                    src="img/partner/01.png"
                    className="img-responsive"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pricing-section section-padding" id="pricing">
          <div className="container">
            <div className="section-title1 text-center">
              <h5>Cost</h5>
              <h1>Our Pricing</h1>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="pricebox">
                  <div className="plan">
                    <header>
                      <p className="plan-title">Monthly</p>
                      <div className="plan-cost">
                        <span className="plan-price">$5</span>
                        <span className="plan-type">/ month</span>
                      </div>
                    </header>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="pricebox">
                  <div className="plan">
                    <header>
                      <p className="plan-title">Annually</p>
                      <div className="plan-cost">
                        <span className="plan-price">$50</span>
                        <span className="plan-type">/ year</span>
                      </div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 mar-50">
                <div className="footer-title" />
                <p>We make cool things in a short amount of time.</p>
                <h3>
                  <i className="fa fa-send" /> cs6timetracker@gmail.com
                </h3>
                <h3>
                  <i className="fa fa-map-marker" /> Lambda School
                </h3>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
