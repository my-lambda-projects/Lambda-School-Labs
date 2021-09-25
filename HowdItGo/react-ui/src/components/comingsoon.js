import React from 'react';
import './comingsoon.css';
import 'font-awesome/css/font-awesome.min.css';

const ComingSoonPage = () =>
    <body id="comingSoon">
    <div className="page">
        <label>
            <input type="checkbox"  />
            <div className="card">
                <div className="front">
                    <div className="cardContent">
                        <div className="words">Coming Soon
                        <p2>HowdItGo</p2>
                        Click To Learn More</div>
                        <i className="fa fa-chevron-circle-down fa-3x"> </i>
                    </div>
                </div>
                <div className="back">
                    <div className="cardContent">

                        <div className="backContent"> <p4>HowdItGo</p4>
                            <div className="words2">
                                <h5>
                                    We help you connect to your customers, so you can help your business grow.</h5>
                                <h5> </h5>
                                    <h5>Customers use online reviews to make choices about businesses.</h5>
                                <h5> </h5>
                                  <h5> Make sure your business stands out with online review management.
                                </h5> </div>


                        </div>
                    </div>
                </div>
            </div>
        </label>
    </div>
    </body>

export default ComingSoonPage;