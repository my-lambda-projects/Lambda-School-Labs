import React from "react";
import MainLandingImg from "./img/main_landing.png";
import ScrollAnimation from "react-animate-on-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarAlt,
  faCreditCard,
  faDumbbell
} from "@fortawesome/free-solid-svg-icons";

library.add(faCalendarAlt, faCreditCard, faDumbbell);

class AboutApp extends React.Component {
  render() {
    return (
      <section className="about__app__landing">
        <div className="container">
          <ScrollAnimation animateIn="fadeInUp">
            <div className="display__more">
              <div className="container">
                <img src={MainLandingImg} alt="Read more" />
                <p>
                  BRAWNDO is a workout tracker for the connected era - create
                  custom workout routines, see your schedule at a glance, review
                  past performance and more.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
        <ScrollAnimation animateIn="fadeInUp">
          <h2>About the app</h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp">
          <div className="landing__icons">
            <div className="container">
              <FontAwesomeIcon icon="calendar-alt" />
              <FontAwesomeIcon icon="credit-card" />
              <FontAwesomeIcon icon="dumbbell" />
            </div>
          </div>
        </ScrollAnimation>
      </section>
    );
  }
}

export default AboutApp;
