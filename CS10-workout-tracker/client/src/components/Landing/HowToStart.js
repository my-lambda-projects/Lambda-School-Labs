import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

class HowToStart extends React.Component {
  render() {
    return (
      <section className="landing__start">
        <div className="landing__start__content">
          <ScrollAnimation animateIn="fadeInUp">
            <h2>How To Start</h2>
          </ScrollAnimation>
          <div>
            <ScrollAnimation animateIn="fadeInUp">
              <p>
                <span>1</span> SIGN UP
              </p>
              <p>
                <span>2</span> WORK OUT
              </p>
              <p>
                <span>3</span> GET BUFF
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    );
  }
}

export default HowToStart;
