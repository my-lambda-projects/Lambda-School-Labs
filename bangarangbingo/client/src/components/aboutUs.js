
import React from 'react';
// import 'font-awesome/css/font-awesome.min.css';
import './aboutUs.css';

const AboutUs = props => (
  <div className="aboutUs">
    <header>
      <img src="/images/logo.gif" alt="Bangarang Bingo" />
    </header>
    <div className="aboutUs__content">
      <div className="aboutUs__contentTitle">About Us</div>
      <div className="aboutUs__contentBlurbs">
        <div className="blurb">
          <div className="blurb__img"><img src="/images/Cassidy.jpeg" alt="Cassidy Avery" /></div>
          <div className="blurb__content">
            <div className="blurb__title">
              <div className="blurb__name">Cassidy Avery</div>
              <div className="blurb__link">
                <a href="https://www.linkedin.com/in/cassidysnavery" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
                <a href="https://github.com/tacolim" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
                <a href="https://twitter.com/tacolimCass" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
              </div>
            </div>
            <div className="blurb__text">Front End Engineer for Bangarang Bingo</div>
          </div>
        </div>
        <div className="blurb">
          <div className="blurb__img">
            <img src="/images/Sondro.jpeg" alt="Christopher Coggins" />
          </div>
          <div className="blurb__content">
            <div className="blurb__title">
              <div className="blurb__name">Christopher Coggins</div>
              <div className="blurb__link">
                <a href="https://www.linkedin.com/in/sondro/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
                <a href="https://github.com/Sondro" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
              </div>
            </div>
            <div className="blurb__text">Bingo Card Designer and Engineer for Bangarang Bingo</div>
            
          </div>
        </div>
        <div className="blurb">
          <div className="blurb__img">
            <img src="/images/Christian.jpeg" alt="Christian Franco" />
          </div>
          <div className="blurb__content">
            <div className="blurb__title">
              <div className="blurb__name">Christian Franco</div>
              <div className="blurb__link">
                <a href="https://www.linkedin.com/in/whoisvibes/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
                <a href="https://github.com/vibe" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
              </div>
            </div>
            <div className="blurb__text">Full-Stack Engineer for Bangarang Bingo</div>
          </div>
        </div>

      </div>
    </div>
    <section className="return">
      <button onClick={props.history.goBack}>Close About Us</button>
    </section>
  </div>
);

export default AboutUs;
