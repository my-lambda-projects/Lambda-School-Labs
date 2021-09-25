import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

class Quote extends React.Component {
  render() {
    return (
      <section>
        <div className="landing__quote">
          <h2>
            <strong>
              <ScrollAnimation animateIn="fadeInUp">
                "PAIN IS WEAKNESS LEAVING THE BODY"
              </ScrollAnimation>
            </strong>
          </h2>
        </div>
      </section>
    );
  }
}

export default Quote;
