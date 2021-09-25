import React, { Component } from "react";
import "./assets/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tai from "./assets/img/faces/tai.png";
import Chad from "./assets/img/faces/chad.jpg";
import Richard from "./assets/img/faces/richard.jpg";
import Will from "./assets/img/faces/willkwon.png";
import Fred from "./assets/img/faces/Fred.jpg";
import Joshua from "./assets/img/faces/Joshua.png";
import Brian from "./assets/img/faces/Brian.png";
import Thomas from "./assets/img/faces/thomas.jpg";
import Jared from "./assets/img/faces/jared.jpg";
import Nightsky1 from "./assets/img/gabriele.jpg";
import Nightsky from "./assets/img/timothee.jpg";
import Infomercial from "../Infomercial/index";

class LandingPage extends Component {
  state = {
    isTop: true
  }

  componentWillUnmount() {
    document.removeEventListener('scroll');
  }

  onScroll = (isTop) => {
    this.setState({ isTop });
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 500;
      if (isTop !== this.state.isTop) {
        this.onScroll(isTop);
      }
    });
  }




  render() {
    return (
      <div>
        {/* Navbar */}
        <nav
          className={`navbar navbar-expand-lg fixed-top ${this.state.isTop ? 'navbar-transparent' : 'nothing'}`}
          color-on-scroll={`300`}
        >
          <div className="container">
            <div className="navbar-translate">
              <a className="navbar-brand" href={"/"}>
                <FontAwesomeIcon icon={["fas", "at"]} className="space" />
                Don't send that email
              </a>
              <button
                className="navbar-toggler navbar-toggler-right navbar-burger"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggler"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                {/* The Hamburger in tablet/mobile view */}
                <span className="navbar-toggler-bar" />
                <span className="navbar-toggler-bar" />
                <span className="navbar-toggler-bar" />
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                    href={process.env.REACT_APP_BACKEND_URL + "/auth/login"}
                    className="nav-link"
                  >
                    <i className="nc-icon nc-button-power" />Let's get started
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    rel="tooltip"
                    title="Follow us on Twitter"
                    data-placement="bottom"
                    href="https://www.twitter.com"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "twitter"]}
                      className="fa fa-twitter"
                    />
                    <p className="d-lg-none">Twitter</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    rel="tooltip"
                    title="Like us on Facebook"
                    data-placement="bottom"
                    href="https://www.facebook.com"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "facebook"]}
                      className="fa fa-facebook-square"
                    />
                    <p className="d-lg-none">Facebook</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    rel="tooltip"
                    title="Follow us on Instagram"
                    data-placement="bottom"
                    href="https://www.instagram.com"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "instagram"]}
                      className="fa fa-instagram"
                    />
                    <p className="d-lg-none">Instagram</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    rel="tooltip"
                    title="Star on GitHub"
                    data-placement="bottom"
                    href="https://github.com/Lambda-School-Labs/dont-send-that-email"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "github"]}
                      className="fa fa-github"
                    />
                    <p className="d-lg-none">GitHub</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Centered Text */}
        <div className="page-header computer" data-parallax="false">
          <div className="filter" />
          <div className="container">
            <div className="motto text-center">
              <h1>Don't send that email!</h1>
              <h3>
                Save yourself the trouble of worrying about the tone of your
                emails.
              </h3>
              <br />
              <a
                href={process.env.REACT_APP_BACKEND_URL + "/auth/login"}
                className="btn btn-outline-neutral btn-round"
              >
                <i className="fa fa-play" />Let's Get Started
              </a>
            </div>
          </div>
        </div>
        {/* Let's Talk Product Section */}
        <div className="main">
          <div className="section text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="title">Let's talk product</h2>
                  <h5 className="description">
                    Our product can help you in many situations, want that job
                    and need someone to ensure you give the proper tone or
                    convey the right emotions? We got you covered.
                  </h5>
                  <br />
                  {/* <a href="#paper-kit" className="btn btn-danger btn-round">
                    See Details
                  </a> */}
                  <Infomercial />
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                {/* Family and friends card */}
                <div className="col-md-3">
                  <div className="info">
                    <div className="icon icon-danger">
                      <i className="nc-icon nc-chat-33" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Family and friends</h4>
                      <p className="description">
                        Our product can help you give the proper holiday wish or
                        casual conversation.
                      </p>
                      <a href="#pkp" className="btn btn-link btn-danger">
                        See more
                      </a>
                    </div>
                  </div>
                </div>
                {/* Intuitive card */}
                <div className="col-md-3">
                  <div className="info">
                    <div className="icon icon-danger">
                      <i className="nc-icon nc-bulb-63" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Intuitive</h4>
                      <p>
                        Help you catch the right emotions to ensure higher
                        chances to convey what you want.
                      </p>
                      <a href="#pkp" className="btn btn-link btn-danger">
                        See more
                      </a>
                    </div>
                  </div>
                </div>
                {/* Promotions card */}
                <div className="col-md-3">
                  <div className="info">
                    <div className="icon icon-danger">
                      <i className="nc-icon nc-email-85" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Promotions</h4>
                      <p>
                        Sometime knowing the proper tone can help reach new
                        potential customers.
                      </p>
                      <a href="#pkp" className="btn btn-link btn-danger">
                        See more
                      </a>
                    </div>
                  </div>
                </div>
                {/* Efficiency card */}
                <div className="col-md-3">
                  <div className="info">
                    <div className="icon icon-danger">
                      <i className="nc-icon nc-watch-time" />
                    </div>
                    <div className="description">
                      <h4 className="info-title">Efficiency</h4>
                      <p>
                        Our product utilize IBM Tone analyzer to ensure you get
                        proper and accurate details.
                      </p>
                      <a href="#pkp" className="btn btn-link btn-danger">
                        See more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Let's talk about us Section */}
          <div className="section section-dark text-center team-3">
            <div className="container">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto text-center">
                  <h2 className="title">Let's talk about us</h2>
                  <h5 className="description">
                    Six Web Developers from variety of background, met each
                    other for the first time to create a full scale application
                    together.
                  </h5>
                </div>
              </div>
              <div className="space-top" />
              <div className="row">
                <div className="col-md-6">
                  <div className="card card-profile card-plain">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="card-img-top">
                          <a href="#pablo">
                            <img
                              className="img"
                              src={Richard}
                              alt={"Richard Pryor"}
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body text-left">
                          <h4 className="card-title">Richard Verdier</h4>
                          <h6 className="card-category">
                            Full Stack Web Developer
                          </h6>
                          <p className="card-description">
                            I think we did well.
                          </p>
                          <div className="card-footer pull-left">
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-twitter"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "twitter"]}
                                className="fa fa-twitter"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-facebook"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "linkedin-in"]}
                                className="fa fa-linkedin"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-google"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "google-plus-g"]}
                                className="fa fa-google-plus"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-profile card-plain">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="card-img-top">
                          <a href="#pablo">
                            <img className="img" src={Fred} alt={"Fred"} />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body text-left">
                          <h4 className="card-title">Fred Sohn</h4>
                          <h6 className="card-category">
                            Full Stack Web Developer
                          </h6>
                          <p className="card-description">
                            Hello darkness my old friend.
                          </p>
                          <div className="card-footer pull-left">
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-twitter"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "twitter"]}
                                className="fa fa-twitter"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-facebook"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "linkedin-in"]}
                                className="fa fa-linkedin"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-google"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "google-plus-g"]}
                                className="fa fa-google-plus"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-profile card-plain">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="card-img-top">
                          <a href="#pablo">
                            <img className="img" src={Will} alt={"Will Kwon"} />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body text-left">
                          <h4 className="card-title">Will Kwon</h4>
                          <h6 className="card-category">
                            Full Stack Web Developer
                          </h6>
                          <p className="card-description">
                            Wait is the timezone issue related to stripe?
                          </p>
                          <div className="card-footer pull-left">
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-twitter"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "twitter"]}
                                className="fa fa-twitter"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-facebook"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "linkedin-in"]}
                                className="fa fa-linkedin"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-google"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "google-plus-g"]}
                                className="fa fa-google-plus"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-profile card-plain">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="card-img-top">
                          <a href="#pablo">
                            <img className="img" src={Jared} alt={"Jared"} />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body text-left">
                          <h4 className="card-title">Jared Cuffe</h4>
                          <h6 className="card-category">
                            Full Stack Web Developer
                          </h6>
                          <p className="card-description">
                            Debugging timezones with Richard. Almost, but not
                            quite
                          </p>
                          <div className="card-footer pull-left">
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-twitter"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "twitter"]}
                                className="fa fa-twitter"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-facebook"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "linkedin-in"]}
                                className="fa fa-linkedin"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-google"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "google-plus-g"]}
                                className="fa fa-google-plus"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-profile card-plain">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="card-img-top">
                          <a href="#pablo">
                            <img className="img" src={Tai} alt={"me"} />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body text-left">
                          <h4 className="card-title">Tai Le</h4>
                          <h6 className="card-category">
                            Full Stack Web Developer
                          </h6>
                          <p className="card-description">
                            I love you like Kanye loves Kanye. Don't be scared
                            of the truth. Kanye loves himself like Kanye loves
                            Kanye.
                          </p>
                          <div className="card-footer pull-left">
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-twitter"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "twitter"]}
                                className="fa fa-twitter"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-facebook"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "linkedin-in"]}
                                className="fa fa-linkedin"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-google"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "google-plus-g"]}
                                className="fa fa-google-plus"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-profile card-plain">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="card-img-top">
                          <a href="#pablo">
                            <img className="img" src={Chad} alt={"Chad"} />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body text-left">
                          <h4 className="card-title">Chad Jemmett</h4>
                          <h6 className="card-category">
                            Full Stack Web Developer
                          </h6>
                          <p className="card-description">
                            I don't have any signal out here.
                          </p>
                          <div className="card-footer pull-left">
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-twitter"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "twitter"]}
                                className="fa fa-twitter"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-facebook"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "linkedin-in"]}
                                className="fa fa-linkedin"
                              />
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link btn-google"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "google-plus-g"]}
                                className="fa fa-google-plus"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pricing Section */}
          <div className="pricing-2">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto text-center">
                  <h2 className="title">Pick the best plan for you</h2>
                  <h5 className="description">
                    You have Free Unlimited Updates and Premium Support on each
                    package.
                  </h5>
                  <br />
                </div>
              </div>
              <div className="space-top" />
              <div className="row">
                <div className="col-md-4">
                  <div
                    className="card card-pricing"
                    data-background="image"
                    style={{ backgroundImage: `url(${Nightsky})` }}
                  >
                    <div className="card-body">
                      <h6 className="card-category">Free</h6>
                      <h1 className="card-title">
                        <small>$</small>0
                        <small>/mo</small>
                      </h1>
                      <ul>
                        <li>
                          <b>100</b> email analyses per 30 days
                        </li>
                        <li>
                          <b>5</b> emails in storage at one time.
                        </li>
                        <li>
                          <b>No</b> Sending Emails
                        </li>
                        {/* <li>
                    <b>2</b> Personal Brand
                  </li> */}
                      </ul>
                      <a href="#pablo" className="btn btn-danger btn-round ">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card card-pricing"
                    data-background="image"
                    style={{ backgroundImage: `url(${Nightsky1})` }}
                  >
                    <div className="card-body">
                      <h6 className="card-category">Premium</h6>
                      <h1 className="card-title">
                        <small>$</small>10
                        <small>/mo</small>
                      </h1>
                      <ul>
                        <li>
                          <b>Unlimited</b> Email analyses
                        </li>
                        <li>
                          <b>Unlimited</b> Email storage
                        </li>
                        <li>
                          <b>Unlimited</b> Sending Emails
                        </li>
                      </ul>
                      <a href="#pablo" className="btn btn-danger btn-round">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Testimonials */}
          <div
            className="testimonials-1 section-image"
            style={{ backgroundImage: `url(${Nightsky1})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto text-center">
                  <h2 className="title">Our Clients Love Us</h2>
                  <h5 className="description">
                    You need more information? Check what other persons are
                    saying about our product. They are very happy with their
                    purchase.
                  </h5>
                </div>
              </div>
              <div className="space-top" />
              <div className="row">
                <div className="col-md-4">
                  <div className="card card-testimonial">
                    <div className="card-icon">
                      <FontAwesomeIcon
                        icon={["fas", "quote-right"]}
                        className="fa fa-quote-right"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="card-body">
                      <p className="card-description">
                        "Best product ever! I use 'Don't Send Your Email'
                        everytime I check my students weekly sprint for their
                        emotional tones."
                      </p>
                      <div className="card-footer">
                        <h4 className="card-title">Thomas Greenhalgh</h4>
                        <h6 className="card-category">@BestPMEver</h6>
                        <div className="card-avatar">
                          <a href="#pablo">
                            <img className="img" src={Thomas} alt={"Thomas"} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-testimonial">
                    <div className="card-icon">
                      <FontAwesomeIcon
                        icon={["fas", "quote-right"]}
                        className="fa fa-quote-right"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="card-body">
                      <p className="card-description">
                        "This is the best team ever, three stars across the
                        board!"
                      </p>
                      <div className="card-footer">
                        <h4 className="card-title">Joshua Howland</h4>
                        <h6 className="card-category">@JHowler</h6>
                        <div className="card-avatar">
                          <a href="#pablo">
                            <img
                              className="img"
                              src={Joshua}
                              alt={"Joshua Howland"}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-testimonial">
                    <div className="card-icon">
                      <FontAwesomeIcon
                        icon={["fas", "quote-right"]}
                        className="fa fa-quote-right"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="card-body">
                      <p className="card-description">
                        "This product is the embodient of Lambda School's heart,
                        mind, body and soul."
                      </p>
                      <div className="card-footer">
                        <h4 className="card-title">Brian Doyle</h4>
                        <h6 className="card-category">@Bdoy</h6>
                        <div className="card-avatar">
                          <a href="#pablo">
                            <img className="img" src={Brian} alt={"Brian"} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Us */}
          <div className="section landing-section">
            <div className="container">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="text-center">Keep in touch?</h2>
                  <form className="contact-form">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="nc-icon nc-single-02" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label>Email</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="nc-icon nc-email-85" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Tell us your thoughts and feelings..."
                    />
                    <div className="row">
                      <div className="col-md-4 ml-auto mr-auto">
                        <button className="btn btn-danger btn-lg btn-fill">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;