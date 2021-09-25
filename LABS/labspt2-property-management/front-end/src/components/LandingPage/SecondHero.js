import React from "react";
import ScrollableAnchor from 'react-scrollable-anchor'	

const SecondHero = () => (

 <div className="Hero">
      <div className="intro-section">
      <ScrollableAnchor id={'section1'}>	
        <div className="bg-2-stretch">
        <div className="slide-2-frame">
							<div className="text">
                <h1 className="slide-title">
                  For the modern
                  <br /> property manager.
                  </h1>
      <p>Take care of tedious property management tasks in one place. <br />Be in charge of your properties, anytime, anywhere.<br />
      </p>
      <p>
      Lorem Ipsum. Lorem Ipsum. Lorem Ipsum. Lorem Ipsum.  
      </p>
      {/* <Link to={"/register"}>
        <button>Learn More</button>
      </Link> */}
      </div>
      </div>
      </div>
      </ScrollableAnchor>	
      </div>
      </div>

);


export default SecondHero;
