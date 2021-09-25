import React from 'react';
import { Image } from 'react-bootstrap';
import Team1 from '../Images/Daniel.png';
import Team2 from '../Images/Jon.png';
import Team3 from '../Images/AaronProfile.png';
import Team4 from '../Images/Cliff.png';
import GitCat from '../Images/Ei-sc-github.svg';
import LinkedIn from '../Images/In-2C-41px-TM.png';


const Team = () =>
  (
    <div className="TeamWrapper">
      <h3 className="teamh3">
        <strong>
          The Dream Team:
        </strong>
      </h3>
      <div className="profiles__container">
        <div className="profiles__rt-container">
          <div className="lp-profile-pic">
            <Image width={164} height={164} src={Team4} alt="thumbnail" circle />
            <h3>Cliff Kang</h3>
            <ul className="team-links">
              <li className="team-links__slug">Full Stack Problem Solver</li>
              <li>
                <a href="https://github.com/cliffkang" target="_blank" rel="noopener noreferrer">
                  <img src={GitCat} width="32px" alt="Github Logo" />
                </a>
                <a href="https://www.linkedin.com/in/cliff-kang-70bb6011/" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedIn} width="20px" alt="Linked In Logo" />
                </a>
              </li>
            </ul>
          </div>
          <div className="lp-profile-pic">
            <Image width={164} height={164} src={Team3} alt="thumbnail" circle />
            <h3>Aaron Burk</h3>
            <ul className="team-links">
              <li className="team-links__slug">Epitome of FullStack</li>
              <li>
                <a href="https://github.com/Arkoma" target="_blank" rel="noopener noreferrer">
                  <img src={GitCat} width="32px" alt="Github Logo" />
                </a>
                <a href="https://www.linkedin.com/in/aarondburk/" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedIn} width="20px" alt="Linked In Logo" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="profiles__lt-container">
          <div className="lp-profile-pic">
            <Image width={164} height={164} src={Team1} alt="thumbnail" circle />
            <h3>Daniel Lara</h3>
            <ul className="team-links">
              <li className="team-links__slug">BackEnd Ninja</li>
              <li>
                <a href="https://github.com/Dan-Lara" target="_blank" rel="noopener noreferrer">
                  <img src={GitCat} width="32px" alt="Github Logo" />
                </a>
                <a href="https://www.linkedin.com/in/daniel-lara-59755610a/" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedIn} width="20px" alt="Linked In Logo" />
                </a>
              </li>
            </ul>
          </div>
          <div className="lp-profile-pic">
            <Image width={164} height={164} src={Team2} alt="thumbnail" circle />
            <h3>Jonathan Bry</h3>
            <ul className="team-links">
              <li className="team-links__slug">FrontEnd Wizard</li>
              <li>
                <a href="https://github.com/Jbry123" target="_blank" rel="noopener noreferrer">
                  <img src={GitCat} width="32px" alt="Github Logo" />
                </a>
                <a href="https://www.linkedin.com/in/jonathanbry/" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedIn} width="20px" alt="Linked In Logo" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

export default Team;
