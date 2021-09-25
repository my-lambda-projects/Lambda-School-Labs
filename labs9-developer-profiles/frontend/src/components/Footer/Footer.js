import React from "react";
import { FooterContainer } from "./Footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-right">
        <a href="https://github.com/Lambda-School-Labs/labs9-developer-profiles">
          <i className="fab fa-github"></i>
        </a>
      </div>

      <div className="footer-left">
        <p className="footer-links">
          <a href="/">Home</a>
        </p>

        <p>Developer Profiles &copy; 2019</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
