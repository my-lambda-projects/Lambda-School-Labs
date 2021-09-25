import React from "react";
import MainLandingImg from "./img/main_landing.png";
import ScrollAnimation from "react-animate-on-scroll";

class JumboTron extends React.Component {
  render() {
    return (
      <section className="main__landing__background">
        <div className="container">
          <div className="col__2">
            <div className="main__content__text">
              <ScrollAnimation animateIn="fadeInUp">
                <h1>
                  <span className="primary__color__font">
                    READY TO BRAWN UP?
                  </span>
                </h1>
                <h1>BRAWNDO.APP</h1>
                <p>
                  Manage and track your workouts anywhere, anytime, from any
                  device.
                </p>
              </ScrollAnimation>
            </div>
            <img
              className="main__landing__image"
              src={MainLandingImg}
              alt="Main Workout"
            />
          </div>
        </div>
      </section>
    );
  }
}

export default JumboTron;
