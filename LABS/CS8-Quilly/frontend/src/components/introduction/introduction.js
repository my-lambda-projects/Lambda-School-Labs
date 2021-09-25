import React, { Component } from 'react';
import './introduction.css';

import imgKia from '../../img/Self-Kia.jpg';
import imgKenny from '../../img/Self-Kenny.jpg';
import imgJosh from '../../img/Self-Josh.jpg';
import imgRobert from '../../img/Self-Robert.jpg';

class Introductions extends Component {
    render() {
        return (
            <div className="introductionsPage">
            <div className="aboutQuilly">
                <h3 className="quillyHeader">About Quilly!</h3>
                <p>We all know the struggle of keeping track of where we applied along with the responses we hear back from each company.
                    <br />
                    With Quilly, there is just one less thing to worry about.
                    <br />
                    Just simply input your information and we'll take care of the rest!
                    < br/>
                    Our interface allows you to arrange where you are in the process with a drag and drop.
                </p>
            </div>
                <div className="groupMembers">
                    <div className="member">
                        <h3 className="name">Kenny Pham</h3>
                        <img src={imgKenny} alt="Kenny" class="selfImage" />
                        <ul className="aboutUs">
                            <li>Dog Lover</li>
                        </ul>
                    </div>
                    <div className="member">
                        <h3 className="name">Kia Choi</h3>
                        <img src={imgKia} alt="Kia" class="selfImage" />
                        <ul className="aboutUs">
                            <li>Dog Lover</li>
                        </ul>
                    </div>

                    <div className="member">
                        <h3 className="name">Josh Coyne</h3>
                        <img src={imgJosh} alt="Josh" class="selfImage" />
                        <ul className="aboutUs">
                            <li>Dog Lover</li>
                        </ul>
                    </div>
                    <div className="member">
                        <h3 className="name">Robert Rak</h3>
                        <img src={imgRobert} alt="Robert" class="selfImage" />
                        <ul className="aboutUs">
                            <li>Cat Lover</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Introductions;