import React, { Component } from "react";

import { Header, Icon } from "semantic-ui-react";
import { FooterStyles, LandingFoot } from "../../styles/Landing.js";

class LandingFooter extends Component {
  render() {
    return (
      <div>
        <FooterStyles>
          <LandingFoot>
            <span className="copyright">Copyright 2018</span>
            <div className="LandingLogo">
              <a href="http://twitter.com">
                <Header as="h1">
                  <Icon.Group size="small">
                    <Icon name="twitter" />
                    <Icon corner name="add" />
                  </Icon.Group>
                </Header>
              </a>
            </div>
            <div className="LandingLogo">
              <a href="http://facebook.com">
                <Header as="h1">
                  <Icon.Group size="small">
                    <Icon name="facebook" />
                    <Icon corner name="add" />
                  </Icon.Group>
                </Header>
              </a>
            </div>
          </LandingFoot>
        </FooterStyles>
      </div>
    );
  }
}

export default LandingFooter;
